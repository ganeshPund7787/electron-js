// import { useEffect, useState } from 'react'
// import { format } from 'date-fns'

// type ToDo = {
//   _id: string
//   title: string
//   description?: string
//   status: 'pending' | 'in-progress' | 'completed'
//   dueDate?: string
//   createdAt: string
// }

// export default function Home() {
//   const [todos, setTodos] = useState<ToDo[]>([])
//   const [search, setSearch] = useState('')
//   const [showModal, setShowModal] = useState(false)
//   const [newTitle, setNewTitle] = useState('')

//   useEffect(() => {
//     fetchTodos()
//   }, [])

//   function handleCreateTodoPopup() {
//     setShowModal(true)
//   }

//   function handleCloseModal() {
//     setNewTitle('')
//     setShowModal(false)
//   }

//   async function fetchTodos() {
//     const response = await window.electron.ipcRenderer.invoke('get-todos')
//     if (response.success) {
//       setTodos(response.todos)
//     }
//   }

//   async function handleDelete(id: string) {
//     await window.electron.ipcRenderer.invoke('delete-todo', id)
//     fetchTodos()
//   }

//   async function handleUpdate(id: string, status: ToDo['status']) {
//     await window.electron.ipcRenderer.invoke('update-todo', { id, updates: { status } })
//     fetchTodos()
//   }

//   return (
//     <>
//       <div className="p-6 max-w-3xl mx-auto space-y-6">
//         {/* Search Bar */}
//         <div className="flex items-center gap-2">
//           <input
//             type="text"
//             placeholder="🔍 Search todos..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="w-full px-4 py-2 border border-gray-700 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 outline-none"
//           />
//           <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md">
//             Search
//           </button>
//         </div>

//         {/* Create To-Do Button */}
//         <button
//           className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md"
//           onClick={handleCreateTodoPopup}
//         >
//           ➕ Create To-Do
//         </button>

//         {/* To-Do List */}
//         <div className="space-y-4">
//           {todos.length === 0 ? (
//             <p className="text-center text-gray-500">No To-Dos found.</p>
//           ) : (
//             todos
//               .filter((todo: ToDo) => todo?.title?.toLowerCase().includes(search.toLowerCase()))
//               .map((todo: ToDo) => (
//                 <div
//                   key={todo._id}
//                   className="p-4 border border-gray-700 rounded-md shadow-md bg-gray-900 text-white"
//                 >
//                   <div className="flex flex-col md:flex-row md:items-center justify-between space-y-3 md:space-y-0">
//                     <div>
//                       <h2 className="text-lg font-semibold">{todo.title}</h2>
//                       {todo.description && (
//                         <p className="text-gray-400 text-sm">{todo.description}</p>
//                       )}
//                       <p className="text-xs text-gray-500">
//                         🕒 Created: {format(new Date(todo.createdAt), 'dd MMM yyyy')}
//                       </p>
//                       {todo.dueDate && (
//                         <p className="text-xs text-gray-400">
//                           ⏳ Due: {format(new Date(todo.dueDate), 'dd MMM yyyy')}
//                         </p>
//                       )}
//                     </div>

//                     <div className="flex items-center gap-3">
//                       {/* Status Select */}
//                       <select
//                         value={todo.status}
//                         onChange={(e) => handleUpdate(todo._id, e.target.value as ToDo['status'])}
//                         className="px-3 py-1 border border-gray-600 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 outline-none"
//                       >
//                         <option value="pending">🟠 Pending</option>
//                         <option value="in-progress">🟡 In Progress</option>
//                         <option value="completed">✅ Completed</option>
//                       </select>

//                       {/* Delete Button */}
//                       <button
//                         className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md"
//                         onClick={() => handleDelete(todo._id)}
//                       >
//                         ❌ Delete
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))
//           )}
//         </div>
//       </div>
//       {showModal && (
//         <div className="p-4 border border-gray-600 bg-gray-800 rounded-md space-y-3">
//           <h2 className="text-lg font-semibold text-white">Create New To-Do</h2>
//           <input
//             type="text"
//             placeholder="Enter title..."
//             className="w-full px-4 py-2 border border-gray-400 rounded-md bg-gray-900 text-white focus:outline-none"
//             value={newTitle}
//             onChange={(e) => setNewTitle(e.target.value)}
//           />
//           <div className="flex justify-end gap-2">
//             <button
//               onClick={handleCloseModal}
//               className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={async () => {
//                 if (newTitle.trim()) {
//                   await window.electron.ipcRenderer.invoke('create-todo', {
//                     title: newTitle.trim()
//                   })
//                   fetchTodos()
//                   handleCloseModal()
//                 }
//               }}
//               className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md"
//             >
//               Create
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   )
// }

import { useEffect, useState } from 'react'
import { format } from 'date-fns'

type ToDo = {
  _id: string
  title: string
  description?: string
  status: 'pending' | 'in-progress' | 'completed'
  dueDate?: string
  createdAt: string
}

export default function Home() {
  const [todos, setTodos] = useState<ToDo[]>([])
  const [search, setSearch] = useState('')
  const [newTitle, setNewTitle] = useState('')

  useEffect(() => {
    fetchTodos()
  }, [])

  async function fetchTodos() {
    const response = await window.electron.ipcRenderer.invoke('get-todos')
    if (response.success) {
      setTodos(response.todos)
    }
  }

  async function handleDelete(id: string) {
    await window.electron.ipcRenderer.invoke('delete-todo', id)
    fetchTodos()
  }

  async function handleUpdate(id: string, status: ToDo['status']) {
    await window.electron.ipcRenderer.invoke('update-todo', { id, updates: { status } })
    fetchTodos()
  }

  async function handleCreateTodo() {
    if (!newTitle.trim()) return
    await window.electron.ipcRenderer.invoke('create-todo', {
      title: newTitle.trim()
    })
    setNewTitle('')
    fetchTodos()
  }

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      {/* Search Bar */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="🔍 Search todos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 border border-gray-700 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md">
          Search
        </button>
      </div>

      {/* Create To-Do Input (Always Visible) */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Enter new To-Do title..."
          className="w-full px-4 py-2 border border-gray-400 rounded-md bg-gray-900 text-white focus:outline-none"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <button
          onClick={handleCreateTodo}
          className="px-4 py-2 flex gap-2 items-center bg-green-600 hover:bg-green-700 text-white rounded-md"
        >
          Create
        </button>
      </div>

      {/* To-Do List */}
      <div className="space-y-4">
        {todos.length === 0 ? (
          <p className="text-center text-gray-500">No To-Dos found.</p>
        ) : (
          todos
            .filter((todo: ToDo) => todo?.title?.toLowerCase().includes(search.toLowerCase()))
            .map((todo: ToDo) => (
              <div
                key={todo._id}
                className="p-4 border border-gray-700 rounded-md shadow-md bg-gray-900 text-white"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between space-y-3 md:space-y-0">
                  <div>
                    <h2 className="text-lg font-semibold">{todo.title}</h2>
                    {todo.description && (
                      <p className="text-gray-400 text-sm">{todo.description}</p>
                    )}
                    <p className="text-xs text-gray-500">
                      🕒 Created: {format(new Date(todo.createdAt), 'dd MMM yyyy')}
                    </p>
                    {todo.dueDate && (
                      <p className="text-xs text-gray-400">
                        ⏳ Due: {format(new Date(todo.dueDate), 'dd MMM yyyy')}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Status Select */}
                    <select
                      value={todo.status}
                      onChange={(e) => handleUpdate(todo._id, e.target.value as ToDo['status'])}
                      className="px-3 py-1 border border-gray-600 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                      <option value="pending">🟠 Pending</option>
                      <option value="in-progress">🟡 In Progress</option>
                      <option value="completed">✅ Completed</option>
                    </select>

                    {/* Delete Button */}
                    <button
                      className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md"
                      onClick={() => handleDelete(todo._id)}
                    >
                      ❌ Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
        )}
      </div>
    </div>
  )
}
