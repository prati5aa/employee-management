import Sidebar from '../components/Sidebar'
import EmployeeTable from '../components/EmployeeTable'

const Employee = () => {
  return (
<div className="flex min-h-screen bg-slate-50">
      <Sidebar />
    
      <main className="flex-1 p-8">
     <EmployeeTable/>
      </main>
    </div>
  )
}

export default Employee
