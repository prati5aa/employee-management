import Sidebar from '../components/Sidebar'

import AddEmployeeForm from '../components/AddEmployeeForm'

const EmployeeForm = () => {
  return (
     <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
    
      <main className="flex-1 p-8">
     <AddEmployeeForm/>
      </main>
    </div>
  )
}

export default EmployeeForm
