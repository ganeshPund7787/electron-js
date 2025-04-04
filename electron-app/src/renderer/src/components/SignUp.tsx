import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from 'react-router-dom'

const signUpSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters')
})

type SignUpForm = z.infer<typeof signUpSchema>

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema)
  })

  const onSubmit = async (data: SignUpForm) => {
    try {
      const response = await window.electron.ipcRenderer.invoke('register-user', data)
      alert(response.message)
    } catch (error: any) {
      alert('Registration failed: ' + error.message)
    }
  }

  return (
    <div className="w-80 mx-auto bg-white shadow-lg rounded-xl p-8">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Create an Account</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="block text-gray-700 font-medium">Name</label>
          <input
            {...register('name')}
            className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter your name"
          />
          <p className="text-red-500 text-sm mt-1">{errors.name?.message}</p>
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Email</label>
          <input
            {...register('email')}
            className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter your email"
          />
          <p className="text-red-500 text-sm mt-1">{errors.email?.message}</p>
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Password</label>
          <input
            type="password"
            {...register('password')}
            className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter your password"
          />
          <p className="text-red-500 text-sm mt-1">{errors.password?.message}</p>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Registering...' : 'Sign Up'}
        </button>
      </form>
      <div className="text-center mt-4">
        <p className="text-gray-600">
          Already have an account?{' '}
          <Link className="text-blue-600" to="/sign-in">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  )
}
