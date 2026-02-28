"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, CheckCircle2, XCircle } from "lucide-react"

export default function ConfirmEmailPage() {
    const router = useRouter()

    const [loading, setLoading] = useState(true)
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        const handleConfirmation = async () => {
            const { data, error } = await supabase.auth.getSession()

            if (error || !data.session) {
                setSuccess(false)
<<<<<<< HEAD
                setLoading(false)
                return
            }

            setSuccess(true)

            await supabase.auth.signOut()

            setLoading(false)

            setTimeout(() => {
                router.push("/login")
            }, 4000)
=======
            } else {
                setSuccess(true)
                const timer = setTimeout(() => {
                    router.push("/login")
                }, 2000)

                return () => clearTimeout(timer)

            }

            setLoading(false)
>>>>>>> e31f59ef67256b03fad43000dab7bc13041da1b6
        }

        handleConfirmation()
    }, [router])

    return (
        <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4 font-manrope">
            <Card className="w-full max-w-md shadow-xl bg-white dark:bg-neutral-800 dark:outline-neutral-500">
                <CardHeader>
                    <CardTitle className="text-set1 font-bold text-neutral-900 dark:text-white text-center mt-2.5 mb-2.5">
                        Email Confirmation
                    </CardTitle>
                </CardHeader>

                <CardContent className="flex flex-col items-center gap-6 text-center">
                    {loading && (
                        <>
                            <Loader2 className="h-10 w-10 animate-spin text-primary" />
                            <p>Confirming your email...</p>
                        </>
                    )}

                    {!loading && success && (
                        <>
                            <CheckCircle2 className="h-20 w-20 text-green-600" />
                            <p className="text-set4 font-bold text-neutral-900 dark:text-white">
                                Your email has been successfully confirmed.
                            </p>

                            <Button
                                className="w-full login-links cursor-not-allowed"
                                disabled
                            >
                                Redirecting to Login...
                            </Button>
                        </>
                    )}

                    {!loading && !success && (
                        <>
                            <XCircle className="h-20 w-20 text-destructive" />
                            <p className="text-set4 font-bold text-neutral-900 dark:text-white">
                                Email confirmation failed or link expired.
                            </p>

                            <Button
                                className="w-full cursor-pointer login-links"
                                onClick={() => router.push("/login")}
                            >
                                Back to Login
                            </Button>
                        </>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}