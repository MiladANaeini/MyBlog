import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {useDraft} from "../lib/store/store"
import { formSchema } from "@/constants/formSchema"

export const DraftCard = ({onSubmit})=>{
    const {draft,setDraft} = useDraft()
      const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          name: draft.name,
          description: draft.description,
        },
      })



      const handleSubmit = ()=>{
        form.handleSubmit(onSubmit)
        setDraft(null)
      }
      const handleRemove = ()=>{
        setDraft(null)
      }
    
    return(
        <>
         <Card className="bg-yellow-100">
            <CardHeader>Draft Form</CardHeader>
              <CardContent>
                 <Form {...form}>
                    <form onSubmit={()=>handleSubmit()} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your name" {...field} />
                            </FormControl>
                            {form.formState.errors.name && (
                               <p className="text-red-500 text-sm mt-1">
                            {form.formState.errors.name.message}
                              </p>)}
                          </FormItem>
                        )}
                      />
                     <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea placeholder="Enter a description" {...field} />
                            </FormControl>
                             {form.formState.errors.name && (
                               <p className="text-red-500 text-sm mt-1">
                             {form.formState.errors.name.message}
                            </p>)}
                          </FormItem>
                        )}
                      />
                       <div className="flex gap-2">
                        <Button type="submit">Send</Button>
                        <Button 
                        type="button" onClick={handleRemove}  variant="destructive">
                          Delete
                        </Button>
                      </div>
                    </form>
                 </Form>
        
              </CardContent>
           </Card> 
        </>
    )
}