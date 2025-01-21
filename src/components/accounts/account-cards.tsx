import { Account } from "@/types/account-types"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import EditAccount from "./edit-account"
import DeleteAccounts from "./delete-account"

const AccountCards = ({account} : {
    account : Account
}) => {
  return (
    <Card>
        <CardHeader>
            <CardTitle>
                {account.name}
            </CardTitle>
            <CardDescription>
                Type: {account.type}
            </CardDescription>
        </CardHeader>
        <CardContent>
            <h1 className="text-lg font-medium text-foreground text-wrap tracking-tight">
                Balance: {account.currency} {account.balance}
            </h1>
        </CardContent>
        <CardFooter className="flex w-full flex-row justify-between items-center">
            <p className="text-xs font-medium text-foreground text-wrap tracking-tight">
                Created on: {account.createdAt.toString().split('T')}
            </p>

            {account?._id && (
                <main className="flex flex-row gap-2 items-center">
                    <EditAccount id={account._id}/>
                    <DeleteAccounts id={account._id} />
                </main>
            )}
        </CardFooter>
    </Card>
  )
}

export default AccountCards