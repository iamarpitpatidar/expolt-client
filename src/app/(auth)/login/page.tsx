export default function LoginPage() {
  return (
    <div className="flex justify-center min-h-screen bg-[#f7f8fa] p-6">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow">
        <h1 className="text-3xl font-bold">Software Name</h1>
        <p className="mt-2 text-sm text-gray-600">
          Login into your pages account
        </p>
        <form className="mt-8 space-y-6">
          <div>
            <label className="sr-only" htmlFor="email">
              Email
            </label>
            <input
              autoComplete="email"
              className="w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500"
              id="email"
              name="email"
              placeholder="Email"
              required
              type="email"
            />
          </div>
          <div>
            <label className="sr-only" htmlFor="password">
              Password
            </label>
            <input
              autoComplete="current-password"
              className="w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500"
              id="password"
              name="password"
              placeholder="Password"
              required
              type="password"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                id="remember-me"
                name="remember-me"
                type="checkbox"
              />
              <label
                className="block ml-2 text-sm text-gray-900"
                htmlFor="remember-me"
              >
                Keep me logged in
              </label>
            </div>
            <div className="text-sm">
              <a
                className="font-medium text-indigo-600 hover:text-indigo-500"
                href="#"
              >
                Forgot Password
              </a>
            </div>
          </div>
          <div>
            <button
              className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              type="submit"
            >
              Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
