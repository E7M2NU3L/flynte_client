import { Member } from "@/types/member-types"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import UpdateMember from "./update-member"
import DeleteMember from "./delete-member"
import { Badge } from "../ui/badge"

const MemberCard = ({content} : {content : Member}) => {
  return (
    <Card>
        <CardHeader className="relative">
            <CardTitle>
                {content.name}
            </CardTitle>
            <CardDescription>
                {content.email}
            </CardDescription>

            {content.isPrimary && (
                <Badge className="absolute top-2 right-2">
                    Primary
                </Badge>
            )}
        </CardHeader>
        <CardContent>
            <CardDescription>
                User Income: {content.income}
            </CardDescription>

            <CardDescription>
                Phone Number: {content.phone}
            </CardDescription>
        </CardContent>
        <CardFooter className="justify-between w-full flex-row flex items-center flex-wrap gap-4">
            <p className="text-xs font-medium tracking-tight text-foreground text-wrap">
                Created on : {content.createdAt.toString().split('T')}
            </p>

            <main className="flex flex-row items-center gap-3">
                <UpdateMember key={content._id} id={content._id} />
                <DeleteMember id={content._id} />
            </main>
        </CardFooter>
    </Card>
  )
}

export default MemberCard