import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useMutation } from "react-query";
import { Loader2 } from "lucide-react";
import { isEmpty } from "../common/helper/isEmpty";
import { BlogCardProps, PostType } from "../types/global"
import { Loading } from "./shared/loading";


const deleteData = async (id: string) => {
    await fetch(`/api/posts/${id}`, {
        method: "DELETE",
    });
};
export const BlogCard = ({ blogList, refetch, isLoading }: BlogCardProps) => {

    const { mutate: deleteBlogMutation, isLoading: isLoadingDelete, isError: isErrorDelete, error: deleteError } = useMutation(deleteData, {
        onSuccess: refetch,
    });

    const handleDelete = (id: string) => {
        deleteBlogMutation(id);
    };

    return (
        <>
            {isLoading ? <Loading loading={isLoading} /> :
                <>
                    {!isEmpty(blogList) ?
                        <Card className="mt-3 p-8">
                            <CardHeader>Posted Blogs</CardHeader>
                            {blogList?.map((item: PostType) =>
                                <Card key={item.id} className="bg-teal-200 p-3 m-4">
                                    <CardContent>
                                        <p>Name: {item.name}</p>
                                        <div
                                            className="mb-2 mt-3 grid grid-cols-[25px_1fr] items-start pb-3"
                                        >
                                            <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                                            <div className="space-y-1">
                                                <p className="text-sm font-medium leading-none">
                                                    {item.description}
                                                </p>
                                            </div>
                                        </div>
                                        <p className="text-sm text-muted-foreground ">
                                            Created At: {item.createdAt}
                                        </p>
                                        <div className="flex gap-2">
                                            <Button
                                                type="button" onClick={() => handleDelete(item.id)} variant="destructive">
                                                {isLoadingDelete && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                                Delete
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            )}
                        </Card>
                    : null}
                </>
            }

        </>
    )
}

