import './style.scss'

export default function ConnectApp() {
  const progress = ['Connecting']

  return (
    <div className="h-screen bg-[#0e1116]">
      <h1 className="text-2xl text-gray-200 text-center py-12">
        Setting up your environment
      </h1>
      <div className="flex flex-col justify-center items-center">
        <div className="w-2/6 bg-[#24292e] rounded-md px-6 py-8 min-h-72">
          {progress.map((step, index) => (
            <div
              key={index}
              className="flex items-center text-gray-300 text-sm mt-1"
            >
              {step}
            </div>
          ))}
          <div className="loader text-gray-200"></div>
        </div>
      </div>
    </div>
  )
}
