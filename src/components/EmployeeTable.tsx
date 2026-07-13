import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  ChevronDown,
  ChevronUp,
  Edit,
  Trash2,
  Eye,
  Plus,
  Filter,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import type { AppDispatch, RootState } from '../app/store';
import { deleteEmployee, fetchEmployees } from '../store/employee/employeeThunk';
import type { Employee } from '../model/Employee';

const normalizeStatus = (status?: string) => {
  const value = status?.toLowerCase() ?? '';

  if (value === 'active' || value === 'inactive') {
    return value;
  }

  return 'inactive';
};

const StatusBadge = ({ status }: { status?: string }) => {
  const normalizedStatus = normalizeStatus(status);
  const statusMap: Record<string, { bg: string; text: string; dot: string; label: string }> = {
    active: {
      bg: 'bg-emerald-50',
      text: 'text-emerald-700',
      dot: 'bg-emerald-500',
      label: 'Active',
    },
    inactive: {
      bg: 'bg-slate-50',
      text: 'text-slate-600',
      dot: 'bg-slate-400',
      label: 'Inactive',
    },
  };

  const config = statusMap[normalizedStatus] || statusMap.inactive;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`}></span>
      {config.label}
    </span>
  );
};

const EmployeeTable = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { employees, loading, error } = useSelector((state: RootState) => state.employees);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' as 'asc' | 'desc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedEmployees, setSelectedEmployees] = useState<number[]>([]);
  const itemsPerPage = 5;

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedDepartment, selectedStatus]);

  const departments = useMemo(() => ['all', ...new Set(employees.map((employee) => employee.department).filter(Boolean))], [employees]);
  const statuses = ['all', 'active', 'inactive'];

  const filteredEmployees = useMemo(() => {
    const search = searchTerm.toLowerCase();

    return employees.filter((employee) => {
      const matchesSearch =
        `${employee.firstName} ${employee.lastName}`.toLowerCase().includes(search) ||
        employee.email.toLowerCase().includes(search) ||
        employee.designation.toLowerCase().includes(search) ||
        employee.department.toLowerCase().includes(search);

      const matchesDepartment = selectedDepartment === 'all' || employee.department === selectedDepartment;
      const matchesStatus = selectedStatus === 'all' || normalizeStatus(employee.status) === selectedStatus;

      return matchesSearch && matchesDepartment && matchesStatus;
    });
  }, [employees, searchTerm, selectedDepartment, selectedStatus]);

  const sortedEmployees = useMemo(() => {
    return [...filteredEmployees].sort((a, b) => {
      const getSortValue = (employee: Employee) => {
        switch (sortConfig.key) {
          case 'designation':
            return employee.designation.toLowerCase();
          case 'department':
            return employee.department.toLowerCase();
          case 'status':
            return normalizeStatus(employee.status);
          case 'joiningDate':
            return employee.joiningDate.toLowerCase();
          case 'name':
          default:
            return `${employee.firstName} ${employee.lastName}`.toLowerCase();
        }
      };

      const valueA = getSortValue(a);
      const valueB = getSortValue(b);

      if (valueA < valueB) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (valueA > valueB) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [filteredEmployees, sortConfig]);

  const totalPages = Math.ceil(sortedEmployees.length / itemsPerPage);
  const paginatedEmployees = sortedEmployees.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleSort = (key: 'name' | 'designation' | 'department' | 'status' | 'joiningDate') => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedEmployees(paginatedEmployees.map((employee) => employee.id));
    } else {
      setSelectedEmployees([]);
    }
  };

  const handleSelectEmployee = (id: number) => {
    setSelectedEmployees((prev) =>
      prev.includes(id) ? prev.filter((employeeId) => employeeId !== id) : [...prev, id],
    );
  };

  const handleDeleteEmployee = (id: number) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      dispatch(deleteEmployee(id));
    }
  };

  const getSortIcon = (key: 'name' | 'designation' | 'department' | 'status' | 'joiningDate') => {
    if (sortConfig.key !== key) {
      return <ChevronDown className="h-3.5 w-3.5 opacity-30" />;
    }

    return sortConfig.direction === 'asc' ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Employees</h1>
            <p className="text-sm text-slate-500 mt-0.5">
              {filteredEmployees.length} employees • {employees.length} total
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate('/employee/new')}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-xl transition-all duration-200 shadow-lg shadow-indigo-200 hover:shadow-indigo-300/50 hover:-translate-y-0.5"
          >
            <Plus className="h-4 w-4" />
            Add Employee
          </button>
        </div>

        {loading && <p className="mb-4 text-sm text-slate-500">Loading employees...</p>}
        {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 mb-6 shadow-sm">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search employees..."
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              />
            </div>

            <div className="flex gap-3">
              <select
                value={selectedDepartment}
                onChange={(event) => setSelectedDepartment(event.target.value)}
                className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all cursor-pointer"
              >
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept === 'all' ? 'All Departments' : dept}
                  </option>
                ))}
              </select>

              <select
                value={selectedStatus}
                onChange={(event) => setSelectedStatus(event.target.value)}
                className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all cursor-pointer"
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>

              <button className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors text-sm flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <span className="hidden sm:inline">Filters</span>
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/50">
                  <th className="w-10 px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedEmployees.length === paginatedEmployees.length && paginatedEmployees.length > 0}
                      onChange={handleSelectAll}
                      className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                    />
                  </th>
                  <th
                    className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider cursor-pointer hover:text-slate-700 transition-colors"
                    onClick={() => handleSort('name')}
                  >
                    <div className="flex items-center gap-1">
                      Employee
                      {getSortIcon('name')}
                    </div>
                  </th>
                  <th
                    className="hidden md:table-cell px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider cursor-pointer hover:text-slate-700 transition-colors"
                    onClick={() => handleSort('designation')}
                  >
                    <div className="flex items-center gap-1">
                      Position
                      {getSortIcon('designation')}
                    </div>
                  </th>
                  <th
                    className="hidden lg:table-cell px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider cursor-pointer hover:text-slate-700 transition-colors"
                    onClick={() => handleSort('department')}
                  >
                    <div className="flex items-center gap-1">
                      Department
                      {getSortIcon('department')}
                    </div>
                  </th>
                  <th
                    className="hidden sm:table-cell px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider cursor-pointer hover:text-slate-700 transition-colors"
                    onClick={() => handleSort('status')}
                  >
                    <div className="flex items-center gap-1">
                      Status
                      {getSortIcon('status')}
                    </div>
                  </th>
                  <th
                    className="hidden xl:table-cell px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider cursor-pointer hover:text-slate-700 transition-colors"
                    onClick={() => handleSort('joiningDate')}
                  >
                    <div className="flex items-center gap-1">
                      Joined
                      {getSortIcon('joiningDate')}
                    </div>
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {paginatedEmployees.map((employee) => (
                  <tr key={employee.id} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedEmployees.includes(employee.id)}
                        onChange={() => handleSelectEmployee(employee.id)}
                        className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center text-white text-xs font-semibold shadow-sm shadow-indigo-200">
                          {employee.firstName.charAt(0)}{employee.lastName.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-800">{`${employee.firstName} ${employee.lastName}`}</p>
                          <p className="text-xs text-slate-400">{employee.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="hidden md:table-cell px-4 py-3">
                      <p className="text-sm text-slate-700">{employee.designation}</p>
                    </td>
                    <td className="hidden lg:table-cell px-4 py-3">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700">
                        {employee.department}
                      </span>
                    </td>
                    <td className="hidden sm:table-cell px-4 py-3">
                      <StatusBadge status={employee.status} />
                    </td>
                    <td className="hidden xl:table-cell px-4 py-3">
                      <span className="text-sm text-slate-500">{employee.joiningDate}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors text-slate-400 hover:text-slate-600">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors text-slate-400 hover:text-slate-600">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteEmployee(employee.id)}
                          className="p-1.5 hover:bg-red-50 rounded-lg transition-colors text-slate-400 hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="border-t border-slate-200 px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-50/30">
            <div className="text-sm text-slate-500">
              Showing {((currentPage - 1) * itemsPerPage) + 1} to{' '}
              {Math.min(currentPage * itemsPerPage, filteredEmployees.length)} of {filteredEmployees.length} entries
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-slate-600"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${currentPage === page ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-200' : 'hover:bg-slate-100 text-slate-600'}`}
                  >
                    {page}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages || totalPages === 0}
                className="p-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-slate-600"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white rounded-xl border border-slate-200/80 px-4 py-3 shadow-sm">
            <p className="text-xs text-slate-400">Total Employees</p>
            <p className="text-xl font-bold text-slate-800 mt-0.5">{employees.length}</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200/80 px-4 py-3 shadow-sm">
            <p className="text-xs text-slate-400">Active</p>
            <p className="text-xl font-bold text-emerald-600 mt-0.5">{employees.filter((employee) => normalizeStatus(employee.status) === 'active').length}</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200/80 px-4 py-3 shadow-sm">
            <p className="text-xs text-slate-400">Departments</p>
            <p className="text-xl font-bold text-indigo-600 mt-0.5">{new Set(employees.map((employee) => employee.department)).size}</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200/80 px-4 py-3 shadow-sm">
            <p className="text-xs text-slate-400">Inactive</p>
            <p className="text-xl font-bold text-amber-600 mt-0.5">{employees.filter((employee) => normalizeStatus(employee.status) === 'inactive').length}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeTable;