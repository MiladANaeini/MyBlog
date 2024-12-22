import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"

export default function Home() {
  return (
   <div className="p-5">
    <Card>
    <CardHeader>Hello World</CardHeader>
      <CardContent>
      <Textarea />

   <Button>Send</Button>
   <Button>Draft</Button>

      </CardContent>
   </Card>
   </div>
  );
}
