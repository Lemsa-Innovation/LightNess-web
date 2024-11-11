"use client"
import { useCallback } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

export const useSearchParamsName = () => {
	const { push } = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()
	const createQueryString = useCallback(
		(name: string, value: string) => {
			const params = new URLSearchParams(searchParams.toString())
			params.set(name, value)
			return params.toString()
		},
		[searchParams]
	)
	const deleteQueryString = useCallback(
		(name: string) => {
			const params = new URLSearchParams(searchParams.toString())
			params.delete(name)
			return params.toString()
		},
		[searchParams]
	)
	const setParam = (name: string, value: string) => {
		push(pathname + '?' + createQueryString(name, value))
	}
	const deleteParam = (name: string) => {
		push(pathname + '?' + deleteQueryString(name))
	}
	const getParam = useCallback((name: string) => {
		const params = new URLSearchParams(searchParams.toString())
		return params.get(name)
	}, [searchParams])
	return { setParam, deleteParam, getParam }
}