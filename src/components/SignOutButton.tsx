"use client"

import { Loader2, LogOut } from 'lucide-react'
import { signOut } from 'next-auth/react'
import { ButtonHTMLAttributes, FC, useState } from 'react'
import toast from 'react-hot-toast'
import Button from './ui/Button'

interface SignOutButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const SignOutButton: FC<SignOutButtonProps> = ({...props }) => {
     const [isSigingOut, setIsSigningOut] = useState<boolean>(false)
    return (
    <Button {...props} variant='ghost' onClick={async () => {
        setIsSigningOut(true)
        try {
            await signOut()
        } catch (error) {
            toast.error('Something went wrong with your sign out. Please try again.')
        } finally {
            setIsSigningOut(false)
        }
    }}>
        {isSigingOut ? (
        <Loader2 className='h-4 w-4 animate-spin' />
        ) : (
                <LogOut className='h-4 w-4' />
        )}
        </Button>
    )
}

export default SignOutButton