import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from 'react-router-dom'

const signInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters')
})

type SignInForm = z.infer<typeof signInSchema>

export default function  SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<SignInForm>({
    resolver: zodResolver(signInSchema)
  })

  const onSubmit = async (data: SignInForm) => {
    try {
      const response = await window.electron.ipcRenderer.invoke('login-user', data)
      alert(response.success ? 'Login successful!' : response.message)
    } catch (error: any) {
      alert('Login failed: ' + error.message)
    }
  }

  return (
    <div className="w-80 mx-auto bg-white shadow-lg rounded-xl p-8">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Sign In</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="block text-gray-700 font-medium">Email</label>
          <input
            {...register('email')}
            className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
            placeholder="Enter your email"
          />
          <p className="text-red-500 text-sm mt-1">{errors.email?.message}</p>
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Password</label>
          <input
            type="password"
            {...register('password')}
            className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
            placeholder="Enter your password"
          />
          <p className="text-red-500 text-sm mt-1">{errors.password?.message}</p>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition disabled:bg-gray-400"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Logging in...' : 'Sign In'}
        </button>
      </form>
      <div className="text-center mt-4">
        <p className="text-gray-600">
          Don't have an account?{' '}
          <Link className="text-green-600" to="/sign-up">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}
