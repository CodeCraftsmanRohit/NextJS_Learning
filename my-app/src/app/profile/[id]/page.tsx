export default async function UserProfile({
  params,
}: {
  params: { id: string }
}) {
  const { id } = await params;

  return (
   <div className="min-h-screen flex items-center justify-center
                    bg-gradient-to-br from-black via-gray-900 to-black">

      <div className="w-full max-w-xl rounded-2xl bg-white/10
                      backdrop-blur-xl border border-white/20
                      shadow-2xl p-10 text-center">

        <h1 className="text-4xl font-bold text-white mb-4">
          User Profile
        </h1>

        <div className="h-px w-full bg-white/20 mb-6" />

        <p className="text-gray-300 text-lg mb-4">
          Profile ID
        </p>

        <span className="inline-block px-6 py-2 rounded-lg
                         bg-orange-500 text-black text-xl font-bold
                         shadow-md">
          {id}
        </span>

        <p className="mt-6 text-gray-400">
          This is a dynamic profile page
        </p>
      </div>
    </div>
  )
}
