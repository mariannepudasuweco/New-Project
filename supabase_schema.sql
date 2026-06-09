-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- --------------------------------------------------------
-- USERS / PROFILES TABLE
-- --------------------------------------------------------
-- Connects to Supabase Auth (auth.users)
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL CHECK (role IN ('Admin', 'Project Manager', 'Procurement Staff', 'Payroll Staff', 'Viewer')),
  avatar TEXT,
  status TEXT NOT NULL DEFAULT 'Active' CHECK (status IN ('Active', 'Inactive')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- --------------------------------------------------------
-- PROJECTS TABLE
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  client TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('Planning', 'Ongoing', 'Completed', 'On Hold')),
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  budget NUMERIC NOT NULL DEFAULT 0,
  progress NUMERIC NOT NULL DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- --------------------------------------------------------
-- PROCUREMENT RECORDS TABLE
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.procurement_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  request_no TEXT NOT NULL,
  item_description TEXT NOT NULL,
  supplier TEXT NOT NULL,
  request_date DATE NOT NULL,
  cost NUMERIC NOT NULL DEFAULT 0,
  status TEXT NOT NULL CHECK (status IN ('Pending', 'Approved', 'Ordered', 'Delivered', 'Cancelled')),
  payment_status TEXT NOT NULL CHECK (payment_status IN ('Unpaid', 'Partial', 'Paid')),
  remarks TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- --------------------------------------------------------
-- EMPLOYEES TABLE
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.employees (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  position TEXT NOT NULL,
  daily_rate NUMERIC NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- --------------------------------------------------------
-- PAYROLL RECORDS TABLE
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.payroll_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  employee_id UUID NOT NULL REFERENCES public.employees(id) ON DELETE CASCADE,
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  work_days NUMERIC NOT NULL DEFAULT 0,
  overtime_hours NUMERIC NOT NULL DEFAULT 0,
  gross_pay NUMERIC NOT NULL DEFAULT 0,
  deductions NUMERIC NOT NULL DEFAULT 0,
  net_pay NUMERIC NOT NULL DEFAULT 0,
  status TEXT NOT NULL CHECK (status IN ('Draft', 'Approved', 'Paid')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- --------------------------------------------------------
-- SCHEDULE TASKS TABLE
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.schedule_tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  assignee TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  progress NUMERIC NOT NULL DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  status TEXT NOT NULL CHECK (status IN ('Not Started', 'In Progress', 'Completed', 'Delayed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- --------------------------------------------------------
-- INDEXES
-- --------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_procurement_project_id ON public.procurement_records(project_id);
CREATE INDEX IF NOT EXISTS idx_employees_project_id ON public.employees(project_id);
CREATE INDEX IF NOT EXISTS idx_payroll_project_id ON public.payroll_records(project_id);
CREATE INDEX IF NOT EXISTS idx_payroll_employee_id ON public.payroll_records(employee_id);
CREATE INDEX IF NOT EXISTS idx_tasks_project_id ON public.schedule_tasks(project_id);

-- --------------------------------------------------------
-- UPDATED_AT TRIGGERS
-- --------------------------------------------------------
-- Create a generic function to update the updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply triggers to all tables
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON public.projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_procurement_updated_at BEFORE UPDATE ON public.procurement_records FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_employees_updated_at BEFORE UPDATE ON public.employees FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_payroll_updated_at BEFORE UPDATE ON public.payroll_records FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_schedule_tasks_updated_at BEFORE UPDATE ON public.schedule_tasks FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- --------------------------------------------------------
-- ROW LEVEL SECURITY (RLS)
-- --------------------------------------------------------
-- Enable RLS for all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.procurement_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payroll_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.schedule_tasks ENABLE ROW LEVEL SECURITY;

-- Basic Policies (Placeholder defaults assuming authenticated users have access)
-- Note: You should adjust these based on the actual RBAC mapping for Admin, Project Manager, etc.
CREATE POLICY "Allow authenticated users to read and insert Users" ON public.users FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow authenticated users to read and insert Projects" ON public.projects FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow authenticated users to read and insert Procurement" ON public.procurement_records FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow authenticated users to read and insert Employees" ON public.employees FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow authenticated users to read and insert Payroll" ON public.payroll_records FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow authenticated users to read and insert Schedule Tasks" ON public.schedule_tasks FOR ALL TO authenticated USING (true);
