"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Notfound from "@/public/404.png";

export default function NotFound() {
    return (
        <div className="flex min-h-screen items-center justify-center dark:bg-neutral-900 p-4 font-manrope">
            <Card className="w-full max-w-lg shadow-xl bg-white dark:bg-neutral-800">
                <CardContent className="flex flex-col items-center gap-4 p-10 pt-3 text-center">
                    <Image
                        src={Notfound}
                        alt="BookMarker Logo"
                        width={270}
                        height={100}
                    />

                    <div className="space-y-2">
                        <h1 className="text-4xl font-bold">404</h1>
                        <h2 className="text-xl font-semibold">
                            Page Not Found
                        </h2>
                        <p className="text-muted-foreground">
                            The page you're looking for doesn't exist or may have been moved.
                        </p>
                    </div>

                    <div className="flex w-full gap-4">
                        <Button asChild className="w-full login-links">
                            <Link href="/home">Go Home</Link>
                        </Button>

                    </div>
                </CardContent>
            </Card>
        </div>
    )
}