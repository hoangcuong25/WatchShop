/* eslint-disable @typescript-eslint/no-unused-vars */
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
    const token = request.cookies.get('refresh_token')?.value

    if (!token) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    try {
        const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/role`

        const response = await fetch(apiUrl, {
            headers: {
                Cookie: `refresh_token=${token}`
            }
        })

        if (!response.ok) {
            console.error('API Error:', {
                status: response.status,
                statusText: response.statusText
            })
            throw new Error(`API Error: ${response.status} ${response.statusText}`)
        }

        const role = await response.text()

        // Kiểm tra role nếu truy cập /admin
        if (request.nextUrl.pathname.startsWith('/admin') && role !== 'ADMIN') {
            console.log('User is not admin, redirecting to login')
            return NextResponse.redirect(new URL('/login', request.url))
        }
        return NextResponse.next()
    } catch (err) {
        console.error('Middleware error:', err)
        // Token không hợp lệ hoặc hết hạn
        return NextResponse.redirect(new URL('/login', request.url))
    }
}

export const config = {
    matcher: ['/admin/:path*'],
}