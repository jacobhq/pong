import Image from "next/image"
import authImage from '@/public/auth-image.jpg'
import {getCsrfToken, signIn} from "next-auth/react"

import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"

export default function Signin() {
    async function sendMagicLink(rawFormData: FormData) {
        "use server"
        const formData = {
            csrfToken: await getCsrfToken(),
            email: rawFormData.get("email") as string
        }
        await fetch("/api/auth/signin/email", {method: "POST", body: formData})
    }

    return (
        <div className="w-full lg:grid min-h-screen lg:grid-cols-2">
            <div className="flex items-center justify-center py-12">
                <div className="mx-auto grid w-[350px] gap-8">
                    <div className="grid gap-2 text-center">
                        <h1 className="text-3xl font-bold">Sign in</h1>
                        <p className="text-balance text-muted-foreground">
                            Enter your email below to login or create an account
                        </p>
                    </div>
                    <form action={sendMagicLink} className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="me@example.com"
                                required
                            />
                        </div>
                        <Button type="submit" className="w-full">
                            Send magic link
                        </Button>
                        <Button variant="outline" className="w-full" disabled>
                            Login with GitHub
                        </Button>
                    </form>
                </div>
            </div>
            <div className="hidden bg-muted lg:block">
                <Image
                    src={authImage}
                    alt="The pong ball is ready... (https://unsplash.com/photos/a-black-background-with-a-blue-object-in-the-middle-of-it-VhFlw3XdUuE)"
                    className="max-h-screen w-full object-cover object-top dark:grayscale"
                />
            </div>
        </div>
    )
}
