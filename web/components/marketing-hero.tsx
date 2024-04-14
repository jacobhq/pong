import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { signIn } from "@/lib/auth";

export function MarketingHero() {
    return (
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center space-y-8 text-center">
                    <div className="space-y-6">
                        <h1 className="text-5xl font-bold tracking-tighter sm:flex-1 sm:order-1 sm:text-5xl md:text-6xl lg:text-8xl/none">
                            Design. Train. Ship.
                        </h1>
                        <p className="mx-auto max-w-[675px] sm:max-w-[550px] text-gray-500 md:text-xl dark:text-gray-400">
                            The only end-to-end model development platform that provides tools for model design,
                            training, and
                            deployment.
                        </p>
                    </div>
                    <div className="w-full max-w-sm space-y-2">
                        <form className="flex space-x-2" action={async (formData) => {
                            "use server"
                            await signIn("resend", formData)
                        }}
                        >
                            <Input className="max-w-lg flex-1 h-16 px-6" placeholder="Enter your email" type="email" name="email" />
                            <Button className="h-16 text-md font-semibold" size="lg" type="submit">
                                Sign Up
                            </Button>
                        </form>
                        <p className="text-xs text-gray-500 dark:text-gray-400">We will send a magic-link to your
                            email.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
