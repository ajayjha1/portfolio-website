import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

export const Quote = () => {
  return (
    <Card className="bg-black text-white w-[100px] border-gray-800 max-w-[10px]">
      <CardHeader>
        <CardTitle></CardTitle>
        {/* <CardDescription>Card Description</CardDescription> */}
      </CardHeader>
      <CardContent>
        <p>Hello, </p>
        <p>World</p>
      </CardContent>
      {/* <CardFooter>
        <p>Card Footer</p>
      </CardFooter> */}
    </Card>
  )
}
