import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function IntakeForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    date: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // save details to localStorage so chatbot can use them later
    localStorage.setItem("intakeData", JSON.stringify(form));

    // ✅ navigate to chatbot page
    navigate("/chatbot");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-surface rounded-2xl p-6 shadow-md"
    >
      <h2 className="text-xl font-bold text-center mb-4">Start Your Journey</h2>

      <label className="block mb-2 text-sm">Full Name</label>
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        className="w-full p-2 rounded bg-elev text-text"
        required
      />

      <label className="block mt-4 mb-2 text-sm">Email Address</label>
      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        className="w-full p-2 rounded bg-elev text-text"
        required
      />

      <label className="block mt-4 mb-2 text-sm">Date</label>
      <input
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
        className="w-full p-2 rounded bg-elev text-text"
        required
      />

      <button
        type="submit"
        className="w-full mt-6 p-3 rounded-2xl bg-gradient-to-r from-purple-500 to-green-400 text-white font-semibold hover:opacity-90"
      >
        Start Free Check-in 🚀
      </button>
    </form>
  );
}