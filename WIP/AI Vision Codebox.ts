import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CodeIcon, EyeIcon, SaveIcon, UploadIcon } from "lucide-react";

export default function Codebox() {
  const [htmlCode, setHtmlCode] = useState("<!-- Start with a header -->\n<header>\n  <h1>Welcome to AI Vision Codebox</h1>\n</header>");
  const [cssCode, setCssCode] = useState("body { font-family: sans-serif; background: #0d1117; color: white; margin: 0; padding: 1rem; }\nheader { background: #1f6feb; padding: 1rem; border-radius: 12px; }");

  const iframeContent = `<!DOCTYPE html><html><head><style>${cssCode}</style></head><body>${htmlCode}</body></html>`;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      <Card className="bg-[#0d1117] border border-gray-700">
        <CardContent className="space-y-4">
          <Tabs defaultValue="html">
            <TabsList>
              <TabsTrigger value="html"><CodeIcon className="w-4 h-4 mr-1" /> HTML</TabsTrigger>
              <TabsTrigger value="css"><CodeIcon className="w-4 h-4 mr-1" /> CSS</TabsTrigger>
            </TabsList>
            <TabsContent value="html">
              <Textarea className="h-64 bg-black text-white" value={htmlCode} onChange={e => setHtmlCode(e.target.value)} />
            </TabsContent>
            <TabsContent value="css">
              <Textarea className="h-64 bg-black text-white" value={cssCode} onChange={e => setCssCode(e.target.value)} />
            </TabsContent>
          </Tabs>
          <div className="flex gap-2">
            <Button variant="secondary"><SaveIcon className="w-4 h-4 mr-1" /> Save</Button>
            <Button variant="secondary"><UploadIcon className="w-4 h-4 mr-1" /> Load</Button>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-white border border-gray-200">
        <CardContent className="p-0">
          <div className="border-b px-4 py-2 bg-gray-100 flex items-center">
            <EyeIcon className="w-4 h-4 mr-2" /> Live Preview
          </div>
          <iframe className="w-full h-[28rem]" sandbox="allow-scripts" srcDoc={iframeContent} />
        </CardContent>
      </Card>
    </div>
  );
}
