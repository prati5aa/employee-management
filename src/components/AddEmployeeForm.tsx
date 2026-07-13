import { useState, type ChangeEvent, type FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { User } from 'lucide-react';
import type { AppDispatch } from '../app/store';
import { Department } from '../model/Department';
import { EmployeeStatus } from '../model/EmployeeStatus';
import type { Employee } from '../model/Employee';
import { createEmployee } from '../store/employee/employeeThunk';

const initialForm: Employee = {
  id: 0,
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  department: Department.IT,
  designation: '',
  salary: 0,
  joiningDate: '',
  status: EmployeeStatus.ACTIVE,
};

const AddEmployeeForm = () => {
  const [form, setForm] = useState<Employee>(initialForm);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: name === 'salary' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (!form.firstName.trim() || !form.lastName.trim() || !form.email.trim() || !form.phone.trim() || !form.designation.trim() || !form.joiningDate) {
      setError('Please fill in all required fields.');
      return;
    }

    setSubmitting(true);

    try {
      const payload: Employee = {
        ...form,
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        designation: form.designation.trim(),
        salary: Number(form.salary),
      };

      await dispatch(createEmployee(payload));
      navigate('/employee');
    } catch {
      setError('Unable to create employee.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8 flex items-center justify-center">
      <div className="w-full max-w-3xl">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-50 mb-4">
              <User className="h-8 w-8 text-indigo-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">Add New Employee</h2>
            <p className="text-slate-500 text-sm mt-1">Enter the employee details below</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-600">{error}</p>}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">First Name *</label>
                <input
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  type="text"
                  className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm transition-all focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  placeholder="John"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Last Name *</label>
                <input
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  type="text"
                  className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm transition-all focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  placeholder="Doe"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Email *</label>
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  type="email"
                  className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm transition-all focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  placeholder="john@company.com"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Phone *</label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  type="tel"
                  className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm transition-all focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Designation *</label>
                <input
                  name="designation"
                  value={form.designation}
                  onChange={handleChange}
                  type="text"
                  className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm transition-all focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  placeholder="Software Engineer"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Salary</label>
                <input
                  name="salary"
                  value={form.salary || ''}
                  onChange={handleChange}
                  type="number"
                  min="1"
                  className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm transition-all focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  placeholder="50000"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Department</label>
                <select
                  name="department"
                  value={form.department}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm transition-all focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                >
                  {Object.values(Department).map((department) => (
                    <option key={department} value={department}>
                      {department}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Status</label>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm transition-all focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                >
                  {Object.values(EmployeeStatus).map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="mb-1 block text-sm font-medium text-slate-700">Joining Date *</label>
                <input
                  name="joiningDate"
                  value={form.joiningDate}
                  onChange={handleChange}
                  type="date"
                  className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm transition-all focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-xl bg-indigo-600 px-4 py-3 font-medium text-white shadow-md shadow-indigo-200 transition-all hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {submitting ? 'Creating Employee...' : 'Create Employee'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEmployeeForm
