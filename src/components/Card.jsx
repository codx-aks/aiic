export default function Card() {
  return (
    <div className="max-w-sm mx-auto mt-10 bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
      <img
        className="w-full h-48 object-cover"
        src="https://plus.unsplash.com/premium_photo-1661878091370-4ccb8763756a?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8amFwYW4lMjBuYXR1cmV8ZW58MHx8MHx8fDA%3D"
        alt="Random nature"
      />
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800">Beautiful Nature</h2>
        <p className="mt-2 text-gray-600">
          Experience the serenity and beauty of the great outdoors.
        </p>
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Explore
        </button>
      </div>
    </div>
  )
}
