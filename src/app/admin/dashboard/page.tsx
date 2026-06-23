"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

/* ─── Blog types ─── */
interface Blog { id: string; title: string; slug: string; excerpt: string; content: string; tags: string[]; date: string; published: boolean; }
const emptyForm = (): Omit<Blog, "id"> => ({ title: "", slug: "", excerpt: "", content: "", tags: [], date: new Date().toISOString().split("T")[0], published: false });
function slugify(t: string) { return t.toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-"); }

/* ─── Settings types ─── */
interface Stat       { value: string; label: string; }
interface FocusCard  { icon: string; label: string; desc: string; tag: string; }
interface StackGroup { label: string; items: string; } // items stored as comma-string for editing
interface OpenSource { text: string; githubUrl: string; }
interface Project    { id: string; title: string; period: string; category: string; description: string; tech: string[]; liveUrl: string; githubUrl: string; videoUrl: string; }

const PROJ_CATEGORIES = ["M37 Labs", "NIELIT", "AARN Logistics", "Side Project", "Other"];
const emptyProject = (): Project => ({ id: Date.now().toString(), title: "", period: "", category: "Side Project", description: "", tech: [], liveUrl: "", githubUrl: "", videoUrl: "" });

/* ─── Shared UI helpers ─── */
const inputCls = "w-full bg-gray-950 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors";
const SaveBtn = ({ onClick, saving, disabled }: { onClick: () => void; saving: boolean; disabled?: boolean }) => (
  <button onClick={onClick} disabled={saving || disabled}
    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-800 disabled:text-gray-600 disabled:cursor-not-allowed text-white text-xs font-medium rounded-lg transition-colors shrink-0">
    {saving ? "Saving…" : "Save"}
  </button>
);

function EyeIcon({ visible }: { visible: boolean }) {
  return visible ? (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  ) : (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
    </svg>
  );
}

function SectionWrap({ title, children, open, onToggle, visible, onToggleVisible }: {
  title: string; children: React.ReactNode; open: boolean; onToggle: () => void;
  visible?: boolean; onToggleVisible?: () => void;
}) {
  return (
    <div className={`border rounded-xl overflow-hidden transition-colors ${visible === false ? "bg-gray-900/20 border-gray-800/50" : "bg-gray-900/50 border-gray-800"}`}>
      <div className="flex items-center">
        {/* Visibility toggle */}
        {onToggleVisible !== undefined && (
          <button
            onClick={e => { e.stopPropagation(); onToggleVisible(); }}
            title={visible ? "Hide on homepage" : "Show on homepage"}
            className={`pl-4 pr-2 py-4 transition-colors shrink-0 ${visible ? "text-green-400 hover:text-green-300" : "text-gray-600 hover:text-gray-400"}`}
          >
            <EyeIcon visible={!!visible} />
          </button>
        )}
        {/* Expand/collapse */}
        <button onClick={onToggle} className="flex-1 flex items-center justify-between px-3 py-4 text-left hover:bg-gray-900/40 transition-colors">
          <div className="flex items-center gap-2">
            <span className={`font-medium text-sm ${visible === false ? "text-gray-500" : "text-white"}`}>{title}</span>
            {visible === false && <span className="text-xs text-gray-600 bg-gray-800 px-2 py-0.5 rounded-full">hidden</span>}
          </div>
          <span className={`text-lg transition-transform duration-200 ${open ? "rotate-180" : ""} ${visible === false ? "text-gray-700" : "text-gray-400"}`}>⌄</span>
        </button>
      </div>
      {open && <div className="px-5 pb-5 border-t border-gray-800 pt-5 space-y-4">{children}</div>}
    </div>
  );
}

export default function AdminDashboard() {
  const router = useRouter();
  const [token, setToken]   = useState<string | null>(null);
  const [activeTab, setTab] = useState<"posts" | "projects" | "homepage">("posts");
  const [toast, setToast]   = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const [openSec, setOpenSec] = useState<string | null>(null);

  /* ── Blog state ── */
  const [blogs,         setBlogs]         = useState<Blog[]>([]);
  const [loading,       setLoading]       = useState(true);
  const [showForm,      setShowForm]      = useState(false);
  const [editingId,     setEditingId]     = useState<string | null>(null);
  const [form,          setForm]          = useState(emptyForm());
  const [tagsInput,     setTagsInput]     = useState("");
  const [_saving,       _setSaving]       = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  /* ── Projects state ── */
  const [projects,         setProjects]         = useState<Project[]>([]);
  const [showProjForm,     setShowProjForm]     = useState(false);
  const [editingProjId,    setEditingProjId]    = useState<string | null>(null);
  const [projForm,         setProjForm]         = useState<Project>(emptyProject());
  const [projTechInput,    setProjTechInput]    = useState("");
  const [deleteProjConfirm, setDeleteProjConfirm] = useState<string | null>(null);
  const [savingProj,       setSavingProj]       = useState(false);

  /* ── Settings state ── */
  const [sav, setSavMap] = useState<Record<string, boolean>>({});
  // section visibility
  type VisKey = "stats" | "focus" | "writing" | "stack" | "openSource" | "footer";
  const [vis, setVis] = useState<Record<VisKey, boolean>>({ stats: true, focus: true, writing: true, stack: true, openSource: true, footer: true });
  // hero
  const [roles,      setRoles]      = useState<string[]>(["Full Stack Developer", "AI Systems Builder"]);
  const [rolesOrig,  setRolesOrig]  = useState<string[]>([]);
  const [newRole,    setNewRole]    = useState("");
  const [aboutText,  setAboutText]  = useState("");
  const [aboutOrig,  setAboutOrig]  = useState("");
  // stats
  const [stats,     setStats]     = useState<Stat[]>([{ value: "", label: "" }, { value: "", label: "" }, { value: "", label: "" }, { value: "", label: "" }]);
  const [statsOrig, setStatsOrig] = useState<Stat[]>([]);
  // focus
  const [focus,     setFocus]     = useState<FocusCard[]>([]);
  const [focusOrig, setFocusOrig] = useState<FocusCard[]>([]);
  // stack
  const [stack,     setStack]     = useState<StackGroup[]>([]);
  const [stackOrig, setStackOrig] = useState<StackGroup[]>([]);
  // open source
  const [os,     setOs]     = useState<OpenSource>({ text: "", githubUrl: "" });
  const [osOrig, setOsOrig] = useState<OpenSource>({ text: "", githubUrl: "" });
  // footer
  const [tagline,     setTagline]     = useState("");
  const [taglineOrig, setTaglineOrig] = useState("");
  const [resumeUrl,   setResumeUrl]   = useState("");
  const [resumeOrig,  setResumeOrig]  = useState("");

  /* ── Auth ── */
  useEffect(() => {
    const t = localStorage.getItem("adminToken");
    if (!t) { router.replace("/admin"); return; }
    setToken(t);
  }, [router]);

  /* ── Load settings ── */
  useEffect(() => {
    fetch("/api/settings").then(r => r.json()).then(d => {
      const r = d.roles || ["Full Stack Developer", "AI Systems Builder"];
      setRoles(r); setRolesOrig(r);
      const a = d.aboutText || "";
      setAboutText(a); setAboutOrig(a);
      const st = d.stats || [];
      setStats(st); setStatsOrig(st);
      const fo = d.focus || [];
      setFocus(fo); setFocusOrig(fo);
      const sk = (d.stack || []).map((g: { label: string; items: string[] }) => ({ label: g.label, items: g.items.join(", ") }));
      setStack(sk); setStackOrig(sk);
      const o = d.openSource || { text: "", githubUrl: "" };
      setOs(o); setOsOrig(o);
      const tl = d.footerTagline || "";
      setTagline(tl); setTaglineOrig(tl);
      const ru = d.resumeUrl || "";
      setResumeUrl(ru); setResumeOrig(ru);
      if (d.sectionVisibility) setVis(v => ({ ...v, ...d.sectionVisibility }));
      if (d.projects) setProjects(d.projects);
    });
  }, []);

  /* ── Load blogs ── */
  const fetchBlogs = useCallback(async (t: string) => {
    setLoading(true);
    const res = await fetch("/api/blogs", { headers: { Authorization: `Bearer ${t}` } });
    const data = await res.json();
    setBlogs(data.blogs || []);
    setLoading(false);
  }, []);
  useEffect(() => { if (token) fetchBlogs(token); }, [token, fetchBlogs]);

  /* ── Helpers ── */
  function showToast(msg: string, type: "success" | "error" = "success") {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }
  function setSavKey(key: string, v: boolean) { setSavMap(s => ({ ...s, [key]: v })); }

  async function saveSetting(key: string, value: unknown, onSuccess: () => void) {
    if (!token) return;
    setSavKey(key, true);
    const res = await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ [key]: value }),
    });
    setSavKey(key, false);
    if (res.ok) { showToast("Saved!"); onSuccess(); }
    else showToast("Save failed.", "error");
  }

  function toggleVis(key: VisKey) {
    const next = { ...vis, [key]: !vis[key] };
    setVis(next);
    saveSetting("sectionVisibility", next, () => {});
  }

  /* ── Project handlers ── */
  function openNewProj() { setEditingProjId(null); const p = emptyProject(); setProjForm(p); setProjTechInput(""); setShowProjForm(true); }
  function openEditProj(p: Project) { setEditingProjId(p.id); setProjForm({ ...p }); setProjTechInput(p.tech.join(", ")); setShowProjForm(true); }
  async function handleSaveProj() {
    if (!token) return;
    setSavingProj(true);
    const tech = projTechInput.split(",").map(t => t.trim()).filter(Boolean);
    const payload = { ...projForm, tech };
    let next: Project[];
    if (editingProjId) {
      next = projects.map(p => p.id === editingProjId ? payload : p);
    } else {
      next = [...projects, { ...payload, id: Date.now().toString() }];
    }
    const res = await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ projects: next }),
    });
    setSavingProj(false);
    if (res.ok) { setProjects(next); setShowProjForm(false); showToast(editingProjId ? "Project updated!" : "Project added!"); }
    else showToast("Save failed.", "error");
  }
  async function handleDeleteProj(id: string) {
    if (!token) return;
    const next = projects.filter(p => p.id !== id);
    const res = await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ projects: next }),
    });
    if (res.ok) { setProjects(next); setDeleteProjConfirm(null); showToast("Project deleted."); }
    else showToast("Delete failed.", "error");
  }
  async function moveProjOrder(id: string, dir: -1 | 1) {
    const idx = projects.findIndex(p => p.id === id);
    if (idx + dir < 0 || idx + dir >= projects.length) return;
    const next = [...projects];
    [next[idx], next[idx + dir]] = [next[idx + dir], next[idx]];
    if (!token) return;
    const res = await fetch("/api/settings", { method: "PUT", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify({ projects: next }) });
    if (res.ok) { setProjects(next); showToast("Order saved!"); }
  }

  /* ── Blog handlers ── */
  function openNew() { setEditingId(null); setForm(emptyForm()); setTagsInput(""); setShowForm(true); }
  function openEdit(b: Blog) { setEditingId(b.id); setForm({ title: b.title, slug: b.slug, excerpt: b.excerpt, content: b.content, tags: b.tags, date: b.date, published: b.published }); setTagsInput(b.tags.join(", ")); setShowForm(true); }
  function handleTitleChange(title: string) { setForm(f => ({ ...f, title, slug: editingId ? f.slug : slugify(title) })); }
  async function handleSave() {
    if (!token) return;
    setSavKey("blog", true);
    const payload = { ...form, tags: tagsInput.split(",").map(t => t.trim()).filter(Boolean) };
    const url = editingId ? `/api/blogs/${editingId}` : "/api/blogs";
    const res = await fetch(url, { method: editingId ? "PUT" : "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify(payload) });
    setSavKey("blog", false);
    if (res.ok) { showToast(editingId ? "Post updated!" : "Post created!"); setShowForm(false); fetchBlogs(token); }
    else showToast("Save failed.", "error");
  }
  async function handleDelete(id: string) {
    if (!token) return;
    await fetch(`/api/blogs/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
    setDeleteConfirm(null); showToast("Post deleted."); fetchBlogs(token);
  }
  async function togglePublish(b: Blog) {
    if (!token) return;
    await fetch(`/api/blogs/${b.id}`, { method: "PUT", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify({ published: !b.published }) });
    fetchBlogs(token);
  }
  function logout() { localStorage.removeItem("adminToken"); router.replace("/admin"); }

  const toggle = (s: string) => setOpenSec(p => p === s ? null : s);

  return (
    <main className="min-h-screen bg-black text-white">
      {toast && (
        <div className={`fixed top-4 right-4 z-50 px-5 py-3 rounded-lg shadow-lg text-sm font-medium ${toast.type === "success" ? "bg-green-800 border border-green-600 text-green-100" : "bg-red-800 border border-red-600 text-red-100"}`}>
          {toast.msg}
        </div>
      )}

      {/* Top bar */}
      <div className="border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
          </div>
          <div>
            <h1 className="font-bold text-white">Admin Panel</h1>
            <p className="text-xs text-gray-500">Portfolio Management</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/" target="_blank" className="text-sm text-gray-400 hover:text-white transition-colors">Home ↗</Link>
          <Link href="/Blog" target="_blank" className="text-sm text-gray-400 hover:text-white transition-colors">Blog ↗</Link>
          <button onClick={logout} className="text-sm text-gray-400 hover:text-red-400 transition-colors border border-gray-700 hover:border-red-700 px-3 py-1.5 rounded-lg">Logout</button>
        </div>
      </div>

      {/* Tab strip */}
      <div className="border-b border-gray-800 px-6">
        <div className="flex gap-1">
          {(["posts", "projects", "homepage"] as const).map(tab => (
            <button key={tab} onClick={() => setTab(tab)}
              className={`px-4 py-3 text-sm font-medium capitalize transition-colors border-b-2 -mb-px ${activeTab === tab ? "border-blue-500 text-white" : "border-transparent text-gray-500 hover:text-gray-300"}`}>
              {tab === "posts" ? "Blog Posts" : tab === "projects" ? "Projects" : "Homepage"}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">

        {/* ═══════════════ POSTS TAB ═══════════════ */}
        {activeTab === "posts" && (
          <div>
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-gray-900 border border-gray-800 rounded-lg p-4"><p className="text-3xl font-bold">{blogs.length}</p><p className="text-sm text-gray-500 mt-1">Total Posts</p></div>
              <div className="bg-gray-900 border border-gray-800 rounded-lg p-4"><p className="text-3xl font-bold text-green-400">{blogs.filter(b => b.published).length}</p><p className="text-sm text-gray-500 mt-1">Published</p></div>
              <div className="bg-gray-900 border border-gray-800 rounded-lg p-4"><p className="text-3xl font-bold text-yellow-400">{blogs.filter(b => !b.published).length}</p><p className="text-sm text-gray-500 mt-1">Drafts</p></div>
            </div>

            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Posts</h2>
              <button onClick={openNew} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                New Post
              </button>
            </div>

            {loading ? (
              <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" /></div>
            ) : blogs.length === 0 ? (
              <div className="text-center py-20 border border-dashed border-gray-700 rounded-xl">
                <p className="text-gray-500 mb-2">No posts yet.</p>
                <button onClick={openNew} className="text-blue-400 hover:text-blue-300 text-sm underline">Create your first post</button>
              </div>
            ) : (
              <div className="space-y-3">
                {blogs.map(blog => (
                  <div key={blog.id} className="bg-gray-900/60 border border-gray-800 rounded-lg px-5 py-4 flex items-start justify-between gap-4 hover:border-gray-700 transition-colors">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${blog.published ? "bg-green-900/60 text-green-300 border border-green-800" : "bg-yellow-900/60 text-yellow-300 border border-yellow-800"}`}>{blog.published ? "Published" : "Draft"}</span>
                        <span className="text-xs text-gray-600">{new Date(blog.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</span>
                      </div>
                      <h3 className="font-semibold text-white truncate">{blog.title}</h3>
                      <p className="text-sm text-gray-500 truncate mt-0.5">{blog.excerpt}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {blog.tags.map(tag => <span key={tag} className="text-xs px-1.5 py-0.5 bg-gray-800 text-gray-400 rounded">{tag}</span>)}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button onClick={() => togglePublish(blog)} className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${blog.published ? "border-yellow-700 text-yellow-400 hover:bg-yellow-900/30" : "border-green-700 text-green-400 hover:bg-green-900/30"}`}>{blog.published ? "Unpublish" : "Publish"}</button>
                      <button onClick={() => openEdit(blog)} className="text-xs px-3 py-1.5 rounded-lg border border-gray-700 text-gray-300 hover:bg-gray-800 transition-colors">Edit</button>
                      {deleteConfirm === blog.id ? (
                        <div className="flex items-center gap-1">
                          <button onClick={() => handleDelete(blog.id)} className="text-xs px-3 py-1.5 rounded-lg bg-red-700 text-white hover:bg-red-600 transition-colors">Confirm</button>
                          <button onClick={() => setDeleteConfirm(null)} className="text-xs px-2 py-1.5 text-gray-400 hover:text-white transition-colors">Cancel</button>
                        </div>
                      ) : (
                        <button onClick={() => setDeleteConfirm(blog.id)} className="text-xs px-3 py-1.5 rounded-lg border border-red-900 text-red-400 hover:bg-red-900/30 transition-colors">Delete</button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ═══════════════ PROJECTS TAB ═══════════════ */}
        {activeTab === "projects" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold">Projects</h2>
                <p className="text-xs text-gray-600 mt-0.5">{projects.length} project{projects.length !== 1 ? "s" : ""} · drag to reorder or use arrows</p>
              </div>
              <button onClick={openNewProj} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                Add Project
              </button>
            </div>

            {projects.length === 0 ? (
              <div className="text-center py-20 border border-dashed border-gray-700 rounded-xl">
                <p className="text-gray-500 mb-2">No projects yet.</p>
                <button onClick={openNewProj} className="text-blue-400 hover:text-blue-300 text-sm underline">Add your first project</button>
              </div>
            ) : (
              <div className="space-y-3">
                {projects.map((proj, idx) => (
                  <div key={proj.id} className="bg-gray-900/60 border border-gray-800 rounded-xl px-5 py-4 flex items-start justify-between gap-4 hover:border-gray-700 transition-colors">
                    {/* Order arrows */}
                    <div className="flex flex-col gap-0.5 shrink-0 pt-1">
                      <button onClick={() => moveProjOrder(proj.id, -1)} disabled={idx === 0} className="text-gray-600 hover:text-gray-300 disabled:opacity-20 transition-colors px-1">▲</button>
                      <button onClick={() => moveProjOrder(proj.id, 1)} disabled={idx === projects.length - 1} className="text-gray-600 hover:text-gray-300 disabled:opacity-20 transition-colors px-1">▼</button>
                    </div>
                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-xs px-2 py-0.5 rounded-full bg-blue-950/60 text-blue-300 border border-blue-800 font-medium">{proj.category}</span>
                        <span className="text-xs text-gray-600 font-mono">{proj.period}</span>
                      </div>
                      <h3 className="font-semibold text-white truncate">{proj.title}</h3>
                      <p className="text-sm text-gray-500 line-clamp-2 mt-0.5">{proj.description}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {proj.tech.map(t => <span key={t} className="text-xs px-1.5 py-0.5 bg-gray-800 text-gray-400 rounded">{t}</span>)}
                      </div>
                      <div className="flex gap-3 mt-2">
                        {proj.liveUrl && <a href={proj.liveUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-400 hover:text-blue-300 font-mono">live ↗</a>}
                        {proj.githubUrl && <a href={proj.githubUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-gray-400 hover:text-white font-mono">github ↗</a>}
                      </div>
                    </div>
                    {/* Actions */}
                    <div className="flex items-center gap-2 shrink-0">
                      <button onClick={() => openEditProj(proj)} className="text-xs px-3 py-1.5 rounded-lg border border-gray-700 text-gray-300 hover:bg-gray-800 transition-colors">Edit</button>
                      {deleteProjConfirm === proj.id ? (
                        <div className="flex items-center gap-1">
                          <button onClick={() => handleDeleteProj(proj.id)} className="text-xs px-3 py-1.5 rounded-lg bg-red-700 text-white hover:bg-red-600 transition-colors">Confirm</button>
                          <button onClick={() => setDeleteProjConfirm(null)} className="text-xs px-2 py-1.5 text-gray-400 hover:text-white transition-colors">Cancel</button>
                        </div>
                      ) : (
                        <button onClick={() => setDeleteProjConfirm(proj.id)} className="text-xs px-3 py-1.5 rounded-lg border border-red-900 text-red-400 hover:bg-red-900/30 transition-colors">Delete</button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ═══════════════ HOMEPAGE TAB ═══════════════ */}
        {activeTab === "homepage" && (
          <div className="space-y-3">

            {/* ── Hero ── */}
            <SectionWrap title="Hero — Typewriter Roles & Bio" open={openSec === "hero"} onToggle={() => toggle("hero")}
              >
              <div>
                <label className="block text-xs text-gray-400 mb-2">Typewriter Roles</label>
                <div className="space-y-2 mb-3">
                  {roles.map((r, i) => (
                    <div key={i} className="flex gap-2">
                      <input value={r} onChange={e => setRoles(roles.map((x, j) => j === i ? e.target.value : x))} className={inputCls} placeholder="Role text" />
                      <button onClick={() => setRoles(roles.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-300 px-2 text-lg">×</button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2 mb-4">
                  <input value={newRole} onChange={e => setNewRole(e.target.value)} onKeyDown={e => { if (e.key === "Enter" && newRole.trim()) { setRoles([...roles, newRole.trim()]); setNewRole(""); } }} className={inputCls} placeholder="Add a role and press Enter" />
                  <button onClick={() => { if (newRole.trim()) { setRoles([...roles, newRole.trim()]); setNewRole(""); } }} className="px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm text-white border border-gray-700">Add</button>
                </div>
                <div className="flex justify-end">
                  <SaveBtn onClick={() => saveSetting("roles", roles, () => setRolesOrig(roles))} saving={!!sav.roles} disabled={JSON.stringify(roles) === JSON.stringify(rolesOrig)} />
                </div>
              </div>

              <div className="border-t border-gray-800 pt-4">
                <label className="block text-xs text-gray-400 mb-2">About / Bio Text</label>
                <textarea value={aboutText} onChange={e => setAboutText(e.target.value)} rows={4} className={`${inputCls} resize-none mb-2`} placeholder="Write a short bio..." />
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">{aboutText.length} chars</span>
                  <SaveBtn onClick={() => saveSetting("aboutText", aboutText, () => setAboutOrig(aboutText))} saving={!!sav.aboutText} disabled={aboutText === aboutOrig} />
                </div>
              </div>
            </SectionWrap>

            {/* ── Stats ── */}
            <SectionWrap title="Impact Stats" open={openSec === "stats"} onToggle={() => toggle("stats")} visible={vis.stats} onToggleVisible={() => toggleVis("stats")}>
              <div className="grid grid-cols-2 gap-3">
                {stats.map((s, i) => (
                  <div key={i} className="bg-gray-950 border border-gray-800 rounded-lg p-3 space-y-2">
                    <input value={s.value} onChange={e => setStats(stats.map((x, j) => j === i ? { ...x, value: e.target.value } : x))} className={inputCls} placeholder="Value (e.g. 90%)" />
                    <input value={s.label} onChange={e => setStats(stats.map((x, j) => j === i ? { ...x, label: e.target.value } : x))} className={inputCls} placeholder="Label (e.g. page load time cut)" />
                  </div>
                ))}
              </div>
              <div className="flex justify-end pt-2">
                <SaveBtn onClick={() => saveSetting("stats", stats, () => setStatsOrig(stats))} saving={!!sav.stats} disabled={JSON.stringify(stats) === JSON.stringify(statsOrig)} />
              </div>
            </SectionWrap>

            {/* ── Recent Writing ── */}
            <SectionWrap title="Recent Writing (Blog Preview)" open={openSec === "writing"} onToggle={() => toggle("writing")} visible={vis.writing} onToggleVisible={() => toggleVis("writing")}>
              <p className="text-xs text-gray-500">This section automatically shows the 3 latest published blog posts. Manage posts in the Blog Posts tab.</p>
            </SectionWrap>

            {/* ── Focus Cards ── */}
            <SectionWrap title="Current Focus Cards" open={openSec === "focus"} onToggle={() => toggle("focus")} visible={vis.focus} onToggleVisible={() => toggleVis("focus")}>
              <div className="space-y-4">
                {focus.map((f, i) => (
                  <div key={i} className="bg-gray-950 border border-gray-800 rounded-lg p-4 space-y-2">
                    <div className="flex gap-2">
                      <input value={f.icon} onChange={e => setFocus(focus.map((x, j) => j === i ? { ...x, icon: e.target.value } : x))} className={`${inputCls} w-16`} placeholder="◈" />
                      <input value={f.label} onChange={e => setFocus(focus.map((x, j) => j === i ? { ...x, label: e.target.value } : x))} className={inputCls} placeholder="Card title" />
                    </div>
                    <textarea value={f.desc} onChange={e => setFocus(focus.map((x, j) => j === i ? { ...x, desc: e.target.value } : x))} rows={2} className={`${inputCls} resize-none`} placeholder="Description..." />
                    <input value={f.tag} onChange={e => setFocus(focus.map((x, j) => j === i ? { ...x, tag: e.target.value } : x))} className={inputCls} placeholder="Tag (e.g. ebic.ai @ M37 Labs)" />
                  </div>
                ))}
              </div>
              <div className="flex justify-end pt-2">
                <SaveBtn onClick={() => saveSetting("focus", focus, () => setFocusOrig(focus))} saving={!!sav.focus} disabled={JSON.stringify(focus) === JSON.stringify(focusOrig)} />
              </div>
            </SectionWrap>

            {/* ── Tech Stack ── */}
            <SectionWrap title="Tech Stack" open={openSec === "stack"} onToggle={() => toggle("stack")} visible={vis.stack} onToggleVisible={() => toggleVis("stack")}>
              <div className="space-y-3">
                {stack.map((g, i) => (
                  <div key={i} className="bg-gray-950 border border-gray-800 rounded-lg p-3 space-y-2">
                    <input value={g.label} onChange={e => setStack(stack.map((x, j) => j === i ? { ...x, label: e.target.value } : x))} className={inputCls} placeholder="Group label (e.g. Frontend)" />
                    <input value={g.items} onChange={e => setStack(stack.map((x, j) => j === i ? { ...x, items: e.target.value } : x))} className={inputCls} placeholder="Comma-separated items (e.g. React, Next.js, TypeScript)" />
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-600">Items are comma-separated.</p>
              <div className="flex justify-end pt-1">
                <SaveBtn
                  onClick={() => saveSetting("stack", stack.map(g => ({ label: g.label, items: g.items.split(",").map(s => s.trim()).filter(Boolean) })), () => setStackOrig(stack))}
                  saving={!!sav.stack}
                  disabled={JSON.stringify(stack) === JSON.stringify(stackOrig)}
                />
              </div>
            </SectionWrap>

            {/* ── Open Source ── */}
            <SectionWrap title="Open Source Section" open={openSec === "os"} onToggle={() => toggle("os")} visible={vis.openSource} onToggleVisible={() => toggleVis("openSource")}>
              <div className="space-y-2">
                <label className="text-xs text-gray-400">Text</label>
                <textarea value={os.text} onChange={e => setOs({ ...os, text: e.target.value })} rows={3} className={`${inputCls} resize-none`} placeholder="Contribution description..." />
                <label className="text-xs text-gray-400">GitHub URL</label>
                <input value={os.githubUrl} onChange={e => setOs({ ...os, githubUrl: e.target.value })} className={inputCls} placeholder="https://github.com/username" />
              </div>
              <div className="flex justify-end pt-2">
                <SaveBtn onClick={() => saveSetting("openSource", os, () => setOsOrig(os))} saving={!!sav.openSource} disabled={JSON.stringify(os) === JSON.stringify(osOrig)} />
              </div>
            </SectionWrap>

            {/* ── Footer & Resume ── */}
            <SectionWrap title="Footer & Resume" open={openSec === "footer"} onToggle={() => toggle("footer")} visible={vis.footer} onToggleVisible={() => toggleVis("footer")}>
              <div className="space-y-2">
                <label className="text-xs text-gray-400">Footer Tagline</label>
                <div className="flex gap-2">
                  <input value={tagline} onChange={e => setTagline(e.target.value)} className={inputCls} placeholder="Let's build something that matters." />
                  <SaveBtn onClick={() => saveSetting("footerTagline", tagline, () => setTaglineOrig(tagline))} saving={!!sav.footerTagline} disabled={tagline === taglineOrig} />
                </div>
              </div>
              <div className="space-y-2 border-t border-gray-800 pt-4">
                <label className="text-xs text-gray-400">Resume URL</label>
                <div className="flex gap-2">
                  <input value={resumeUrl} onChange={e => setResumeUrl(e.target.value)} className={`${inputCls} font-mono`} placeholder="https://drive.google.com/..." />
                  <SaveBtn onClick={() => saveSetting("resumeUrl", resumeUrl, () => setResumeOrig(resumeUrl))} saving={!!sav.resumeUrl} disabled={resumeUrl === resumeOrig} />
                </div>
                {resumeOrig && (
                  <div className="flex items-center gap-2 pt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 shrink-0" />
                    <a href={resumeOrig} target="_blank" rel="noopener noreferrer" className="text-xs text-gray-500 hover:text-blue-400 truncate font-mono">{resumeOrig}</a>
                  </div>
                )}
              </div>
            </SectionWrap>

          </div>
        )}
      </div>

      {/* Project Editor Modal */}
      {showProjForm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 flex items-center justify-center p-4">
          <div className="bg-gray-950 border border-gray-800 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800 sticky top-0 bg-gray-950 z-10">
              <h2 className="text-lg font-bold">{editingProjId ? "Edit Project" : "New Project"}</h2>
              <button onClick={() => setShowProjForm(false)} className="text-gray-400 hover:text-white text-2xl leading-none">&times;</button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm text-gray-400 mb-1.5">Title <span className="text-red-400">*</span></label>
                  <input value={projForm.title} onChange={e => setProjForm(f => ({ ...f, title: e.target.value }))} className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors" placeholder="Project title" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1.5">Period</label>
                  <input value={projForm.period} onChange={e => setProjForm(f => ({ ...f, period: e.target.value }))} className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors" placeholder="Feb 2026 – Present" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1.5">Category</label>
                  <select value={projForm.category} onChange={e => setProjForm(f => ({ ...f, category: e.target.value }))} className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors">
                    {PROJ_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">Description <span className="text-red-400">*</span></label>
                <textarea value={projForm.description} onChange={e => setProjForm(f => ({ ...f, description: e.target.value }))} rows={4} className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors resize-none" placeholder="What this project does and your role..." />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">Tech Stack <span className="text-gray-600">(comma-separated)</span></label>
                <input value={projTechInput} onChange={e => setProjTechInput(e.target.value)} className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors" placeholder="React, Node.js, MongoDB" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1.5">Live URL</label>
                  <input value={projForm.liveUrl} onChange={e => setProjForm(f => ({ ...f, liveUrl: e.target.value }))} className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors font-mono text-sm" placeholder="https://..." />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1.5">GitHub URL</label>
                  <input value={projForm.githubUrl} onChange={e => setProjForm(f => ({ ...f, githubUrl: e.target.value }))} className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors font-mono text-sm" placeholder="https://github.com/..." />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">Demo Video URL <span className="text-gray-600">(optional, /videos/name.mp4)</span></label>
                <input value={projForm.videoUrl} onChange={e => setProjForm(f => ({ ...f, videoUrl: e.target.value }))} className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors font-mono text-sm" placeholder="/videos/demo.mp4" />
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-800 flex justify-end gap-3 sticky bottom-0 bg-gray-950">
              <button onClick={() => setShowProjForm(false)} className="px-5 py-2.5 text-sm border border-gray-700 rounded-lg text-gray-300 hover:bg-gray-800 transition-colors">Cancel</button>
              <button onClick={handleSaveProj} disabled={savingProj || !projForm.title || !projForm.description} className="px-5 py-2.5 text-sm bg-blue-600 hover:bg-blue-700 disabled:bg-blue-900 disabled:cursor-not-allowed rounded-lg text-white font-medium transition-colors">
                {savingProj ? "Saving..." : editingProjId ? "Update Project" : "Add Project"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Blog Editor Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 flex items-center justify-center p-4">
          <div className="bg-gray-950 border border-gray-800 rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800 sticky top-0 bg-gray-950 z-10">
              <h2 className="text-lg font-bold">{editingId ? "Edit Post" : "New Post"}</h2>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-white text-2xl leading-none">&times;</button>
            </div>
            <div className="p-6 space-y-5">
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">Title <span className="text-red-400">*</span></label>
                <input type="text" value={form.title} onChange={e => handleTitleChange(e.target.value)} className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors" placeholder="Post title" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">Slug</label>
                <input type="text" value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))} className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-white font-mono text-sm placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors" placeholder="auto-generated-from-title" />
                <p className="text-xs text-gray-600 mt-1">URL: /Blog/{form.slug || "slug"}</p>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">Excerpt <span className="text-red-400">*</span></label>
                <textarea value={form.excerpt} onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))} rows={2} className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors resize-none" placeholder="Short summary shown on blog listing" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">Content <span className="text-red-400">*</span> <span className="text-gray-600 font-normal ml-1">— # H1, ## H2, **bold**, *italic*, - list, `code`</span></label>
                <textarea value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} rows={16} className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-white font-mono text-sm placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors resize-y" placeholder={"## Introduction\n\nWrite your content here..."} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1.5">Tags <span className="text-gray-600">(comma-separated)</span></label>
                  <input type="text" value={tagsInput} onChange={e => setTagsInput(e.target.value)} className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors" placeholder="AI, Next.js, Research" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1.5">Date</label>
                  <input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors" />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={() => setForm(f => ({ ...f, published: !f.published }))} className={`relative w-12 h-6 rounded-full transition-colors ${form.published ? "bg-blue-600" : "bg-gray-700"}`}>
                  <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${form.published ? "translate-x-7" : "translate-x-1"}`} />
                </button>
                <span className="text-sm text-gray-300">{form.published ? "Published — visible on blog" : "Draft — hidden from blog"}</span>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-800 flex justify-end gap-3 sticky bottom-0 bg-gray-950">
              <button onClick={() => setShowForm(false)} className="px-5 py-2.5 text-sm border border-gray-700 rounded-lg text-gray-300 hover:bg-gray-800 transition-colors">Cancel</button>
              <button onClick={handleSave} disabled={!!sav.blog || !form.title || !form.content || !form.slug} className="px-5 py-2.5 text-sm bg-blue-600 hover:bg-blue-700 disabled:bg-blue-900 disabled:cursor-not-allowed rounded-lg text-white font-medium transition-colors">
                {sav.blog ? "Saving..." : editingId ? "Update Post" : "Create Post"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
