'use client'
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb'

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-light">
      <div className="w-full max-w-md text-center bg-white p-10 rounded-xl shadow">
        <div className="mb-6 flex justify-center">
          <DoNotDisturbIcon className="text-3xl" />
        </div>

        <h1 className="text-4xl font-bold text-primary">OPS!</h1>
        <p className="font-light text-black">
          A página que você está procurando não existe.
        </p>
      </div>
    </main>
  )
}
