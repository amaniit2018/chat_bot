'use client'
import { useState } from 'react'
import axios from 'axios'

export default function ChatPage() {
  const [messages, setMessages] = useState<any[]>([])
  const [input, setInput] = useState('')

  const sendMessage = async () => {
    const userMsg = { role: 'user', content: input }
    setMessages([...messages, userMsg])
    setInput('')

    const res = await axios.post('/api/chat', { message: input })
    const botReply = { role: 'bot', content: res.data.reply }
    setMessages(prev => [...prev, userMsg, botReply])
  }

  return (
    <div className="p-4 max-w-xl mx-auto h-screen flex flex-col bg-cyan-300">
    <div className="border rounded-2xl  bg-white shadow-md flex-1 flex flex-col pb-4 pl-4 pr-4">
      
      <div className="-mx-4 px-4 border-b pb-3 mb-3 flex items-center gap-2 text-2xl font-bold pt-4 bg-cyan-300 rounded-t-2xl">
        <span className="bg-blue-400 p-2 rounded-full text-lg">🤖</span>
        <span>ChatBot</span>
      </div>
      <div className="flex-1 overflow-y-auto mb-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`my-2 flex overflow-x-hidden ${
              msg.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`px-4 py-2 max-w-xs rounded-2xl text-sm ${
                msg.role === 'user'
                  ? 'bg-blue-600 text-white rounded-br-none'
                  : 'bg-gray-200 text-gray-800 rounded-bl-none'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          className="border p-2 rounded-xl flex-1 shadow-sm"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl shadow-md hover:bg-blue-700 transition"
        >
          Send
        </button>
      </div>
    </div>
  </div>
  
  
  
  
  )
}
