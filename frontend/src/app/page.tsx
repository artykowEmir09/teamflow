
"use client";

import { useMemo, useState } from "react";
import {
  Activity,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Bell,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  CircleHelp,
  Clock3,
  Command,
  FolderKanban,
  LayoutDashboard,
  ListTodo,
  Menu,
  Plus,
  Search,
  Settings,
  Sparkles,
  Users,
  X,
} from "lucide-react";

type Task = {
  id: number;
  title: string;
  project: string;
  initials: string;
  color: string;
  priority: "High" | "Medium" | "Low";
  due: string;
  status: "In Progress" | "To Do" | "Done";
};

const initialTasks: Task[] = [
  {
    id: 1,
    title: "Design the new dashboard",
    project: "Website Redesign",
    initials: "WR",
    color: "bg-violet-100 text-violet-700",
    priority: "High",
    due: "Today",
    status: "In Progress",
  },
  {
    id: 2,
    title: "Set up authentication",
    project: "TeamFlow App",
    initials: "TF",
    color: "bg-blue-100 text-blue-700",
    priority: "High",
    due: "Tomorrow",
    status: "To Do",
  },
  {
    id: 3,
    title: "Review API documentation",
    project: "Backend API",
    initials: "BA",
    color: "bg-emerald-100 text-emerald-700",
    priority: "Medium",
    due: "Oct 26",
    status: "In Progress",
  },
  {
    id: 4,
    title: "Create onboarding screens",
    project: "TeamFlow App",
    initials: "TF",
    color: "bg-blue-100 text-blue-700",
    priority: "Medium",
    due: "Oct 27",
    status: "To Do",
  },
  {
    id: 5,
    title: "Prepare project requirements",
    project: "Website Redesign",
    initials: "WR",
    color: "bg-violet-100 text-violet-700",
    priority: "Low",
    due: "Oct 22",
    status: "Done",
  },
];

const projects = [
  {
    name: "TeamFlow App",
    description: "Build a better way to work together",
    initials: "TF",
    color: "bg-blue-600",
    progress: 35,
    tasks: "7 of 20 tasks",
    members: ["EA", "JD", "MK"],
    extra: 2,
  },
  {
    name: "Website Redesign",
    description: "A fresh look for our website",
    initials: "WR",
    color: "bg-violet-600",
    progress: 68,
    tasks: "17 of 25 tasks",
    members: ["EA", "MK", "SL"],
    extra: 1,
  },
  {
    name: "Backend API",
    description: "Build a reliable API service",
    initials: "BA",
    color: "bg-emerald-600",
    progress: 52,
    tasks: "13 of 25 tasks",
    members: ["JD", "SL"],
    extra: 0,
  },
];

const navigation = [
  { label: "Overview", icon: LayoutDashboard },
  { label: "My Tasks", icon: ListTodo, count: "5" },
  { label: "Projects", icon: FolderKanban },
  { label: "Team", icon: Users },
];

export default function Home() {
  const [activeNav, setActiveNav] = useState("Overview");
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [tasks, setTasks] = useState(initialTasks);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [newTask, setNewTask] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);

  const completed = tasks.filter((task) => task.status === "Done").length;
  const active = tasks.filter((task) => task.status !== "Done").length;

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch = [
        task.title,
        task.project,
        task.priority,
        task.status,
      ]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesFilter =
        filter === "All" ||
        (filter === "In Progress" && task.status === "In Progress") ||
        (filter === "To Do" && task.status === "To Do") ||
        (filter === "Done" && task.status === "Done");

      const matchesNav =
        activeNav !== "My Tasks" ||
        task.status !== "Done";

      return matchesSearch && matchesFilter && matchesNav;
    });
  }, [tasks, filter, search, activeNav]);

  function toggleTask(id: number) {
    setTasks((current) =>
      current.map((task) =>
        task.id === id
          ? {
              ...task,
              status: task.status === "Done" ? "To Do" : "Done",
            }
          : task,
      ),
    );
  }

  function createTask() {
    if (!newTask.trim()) return;

    setTasks((current) => [
      {
        id: Date.now(),
        title: newTask.trim(),
        project: "TeamFlow App",
        initials: "TF",
        color: "bg-blue-100 text-blue-700",
        priority: "Medium",
        due: "No date",
        status: "To Do",
      },
      ...current,
    ]);

    setNewTask("");
    setShowCreate(false);
    setActiveNav("My Tasks");
    setFilter("All");
  }

  return (
    <div className="min-h-screen bg-[#f8f9fc] text-slate-800">
      {mobileMenu && (
        <button
          aria-label="Close navigation"
          onClick={() => setMobileMenu(false)}
          className="fixed inset-0 z-40 bg-slate-950/30 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[250px] flex-col border-r border-slate-200 bg-white transition-transform duration-200 lg:translate-x-0 ${
          mobileMenu ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-[82px] items-center gap-3 px-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm shadow-indigo-200">
            <Command size={23} strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900">
              TeamFlow
            </h1>
            <p className="text-[11px] font-medium text-slate-400">
              WORK BETTER TOGETHER
            </p>
          </div>
          <button
            aria-label="Close menu"
            onClick={() => setMobileMenu(false)}
            className="ml-auto rounded-lg p-1 text-slate-400 hover:bg-slate-100 lg:hidden"
          >
            <X size={19} />
          </button>
        </div>

        <div className="mx-4 mb-6 mt-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
            Workspace
          </p>
          <button className="flex w-full items-center gap-2.5 text-left">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-100 text-xs font-bold text-indigo-700">
              MW
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-slate-800">
                My Workspace
              </p>
              <p className="text-xs text-slate-400">Free plan</p>
            </div>
            <ChevronDown size={16} className="text-slate-400" />
          </button>
        </div>

        <div className="px-4">
          <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-400">
            Workspace menu
          </p>

          <nav className="space-y-1">
            {navigation.map(({ label, icon: Icon, count }) => {
              const selected = activeNav === label;
              return (
                <button
                  key={label}
                  onClick={() => {
                    setActiveNav(label);
                    setMobileMenu(false);
                  }}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                    selected
                      ? "bg-indigo-50 text-indigo-700"
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                  }`}
                >
                  <Icon size={18} />
                  <span className="flex-1 text-left">{label}</span>
                  {count && (
                    <span
                      className={`rounded-md px-2 py-0.5 text-xs ${
                        selected
                          ? "bg-white text-indigo-700"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {active}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          <div className="mb-3 mt-9 flex items-center justify-between px-3">
            <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-400">
              Your projects
            </p>
            <button
              aria-label="Create project"
              onClick={() => setShowCreate(true)}
              className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-indigo-600"
            >
              <Plus size={16} />
            </button>
          </div>

          <div className="space-y-1">
            {projects.map((project) => (
              <button
                key={project.name}
                onClick={() => {
                  setActiveNav("Projects");
                  setSearch(project.name);
                  setMobileMenu(false);
                }}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm text-slate-500 hover:bg-slate-50 hover:text-slate-800"
              >
                <span
                  className={`h-2.5 w-2.5 rounded-full ${project.color}`}
                />
                <span className="truncate">{project.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-auto border-t border-slate-100 p-4">
          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-500 hover:bg-slate-50">
            <Settings size={18} />
            Settings
          </button>
          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-500 hover:bg-slate-50">
            <CircleHelp size={18} />
            Help & support
          </button>
          <div className="mt-4 flex items-center gap-3 rounded-xl bg-slate-50 p-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-100 text-xs font-bold text-amber-800">
              EA
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-slate-800">
                Emir Artykov
              </p>
              <p className="truncate text-xs text-slate-400">
                Workspace owner
              </p>
            </div>
            <button
              aria-label="Profile menu"
              onClick={() => setShowProfile(!showProfile)}
              className="text-slate-400 hover:text-slate-700"
            >
              <ChevronDown size={16} />
            </button>
          </div>
          {showProfile && (
            <div className="mt-2 rounded-lg border border-slate-200 bg-white p-2 text-xs text-slate-600">
              <p className="px-2 py-1">Signed in as workspace owner</p>
              <p className="px-2 py-1 text-slate-400">
                Authentication coming soon
              </p>
            </div>
          )}
        </div>
      </aside>

      <main className="min-h-screen lg:pl-[250px]">
        <header className="sticky top-0 z-30 flex h-[72px] items-center justify-between gap-4 border-b border-slate-200 bg-white/95 px-4 backdrop-blur sm:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <button
              aria-label="Open navigation"
              onClick={() => setMobileMenu(true)}
              className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
            >
              <Menu size={20} />
            </button>
            <div className="relative hidden w-64 sm:block lg:w-80">
              <Search
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search tasks and projects..."
                aria-label="Search tasks and projects"
                className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-50"
              />
            </div>
            <span className="text-sm font-medium text-slate-500 sm:hidden">
              {activeNav}
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <span className="hidden text-xs text-slate-400 md:block">
              Friday, October 23
            </span>
            <div className="relative">
              <button
                aria-label="Notifications"
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative rounded-lg border border-slate-200 p-2.5 text-slate-500 hover:bg-slate-50"
              >
                <Bell size={18} />
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full border-2 border-white bg-rose-500" />
              </button>
              {showNotifications && (
                <div className="absolute right-0 top-12 z-50 w-64 rounded-xl border border-slate-200 bg-white p-4 shadow-xl">
                  <p className="text-sm font-semibold text-slate-800">
                    Notifications
                  </p>
                  <p className="mt-2 text-xs leading-5 text-slate-500">
                    You're all caught up on this demo dashboard.
                  </p>
                </div>
              )}
            </div>
            <div className="hidden h-8 w-px bg-slate-200 sm:block" />
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-100 text-xs font-bold text-amber-800">
              EA
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-[1500px] p-4 sm:p-8">
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <div className="mb-2 flex items-center gap-2 text-xs font-medium text-slate-400">
                <span>Workspace</span>
                <span>/</span>
                <span className="text-indigo-600">{activeNav}</span>
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-[30px]">
                {activeNav === "Overview"
                  ? "Good morning, Emir 👋"
                  : activeNav}
              </h2>
              <p className="mt-1.5 text-sm text-slate-500">
                Here's what's happening with your team today.
              </p>
            </div>
            <button
              onClick={() => setShowCreate(true)}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-indigo-200 transition hover:bg-indigo-700"
            >
              <Plus size={17} />
              Create task
            </button>
          </div>

          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              title="Total projects"
              value="12"
              note="Across your workspace"
              icon={<FolderKanban size={19} />}
              iconColor="bg-indigo-50 text-indigo-600"
              trend="+2 this month"
              trendUp
            />
            <StatCard
              title="Active tasks"
              value={String(active + 18)}
              note="Tasks in progress or planned"
              icon={<Activity size={19} />}
              iconColor="bg-blue-50 text-blue-600"
              trend="Across all projects"
            />
            <StatCard
              title="Completed tasks"
              value={String(completed + 42)}
              note="Successfully completed"
              icon={<CheckCircle2 size={19} />}
              iconColor="bg-emerald-50 text-emerald-600"
              trend="+12 this week"
              trendUp
            />
            <StatCard
              title="Upcoming deadlines"
              value="4"
              note="Due within the next 7 days"
              icon={<Clock3 size={19} />}
              iconColor="bg-amber-50 text-amber-600"
              trend="1 due today"
              warning
            />
          </div>

          <section className="mb-8">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Your projects
                </h3>
                <p className="mt-1 text-xs text-slate-400">
                  Keep track of work across your workspace
                </p>
              </div>
              <button
                onClick={() => {
                  setActiveNav("Projects");
                  setSearch("");
                }}
                className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:text-indigo-800"
              >
                View all <ArrowRight size={15} />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
              {projects.map((project) => (
                <article
                  key={project.name}
                  className="rounded-xl border border-slate-200 bg-white p-5 transition hover:border-indigo-200 hover:shadow-md hover:shadow-slate-200/50"
                >
                  <div className="mb-5 flex items-start justify-between gap-3">
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-xl text-sm font-bold text-white ${project.color}`}
                    >
                      {project.initials}
                    </div>
                    <span className="rounded-md bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
                      Active
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">
                    {project.name}
                  </h4>
                  <p className="mt-1 truncate text-xs text-slate-400">
                    {project.description}
                  </p>

                  <div className="mb-2 mt-6 flex items-center justify-between text-xs">
                    <span className="text-slate-500">Progress</span>
                    <span className="font-bold text-slate-700">
                      {project.progress}%
                    </span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className={`h-full rounded-full ${project.color} transition-all`}
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                    <div className="flex items-center">
                      {project.members.map((member, index) => (
                        <div
                          key={member}
                          title={member}
                          className={`-ml-2 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white text-[9px] font-bold ${
                            index === 0
                              ? "bg-amber-100 text-amber-800"
                              : index === 1
                                ? "bg-blue-100 text-blue-800"
                                : "bg-rose-100 text-rose-800"
                          } first:ml-0`}
                        >
                          {member}
                        </div>
                      ))}
                      {project.extra > 0 && (
                        <span className="ml-1 text-[10px] text-slate-400">
                          +{project.extra}
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-slate-400">
                      {project.tasks}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="overflow-hidden rounded-xl border border-slate-200 bg-white">
            <div className="flex flex-col justify-between gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  My tasks
                </h3>
                <p className="mt-1 text-xs text-slate-400">
                  Stay on top of your daily priorities
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-1 rounded-lg bg-slate-100 p-1">
                {["All", "In Progress", "To Do", "Done"].map((item) => (
                  <button
                    key={item}
                    onClick={() => setFilter(item)}
                    className={`rounded-md px-2.5 py-1.5 text-xs font-medium transition sm:px-3 ${
                      filter === item
                        ? "bg-white text-indigo-700 shadow-sm"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative border-b border-slate-100 px-5 py-3 sm:hidden">
              <Search
                size={16}
                className="absolute left-8 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search tasks..."
                aria-label="Search tasks"
                className="w-full rounded-lg border border-slate-200 py-2 pl-9 pr-3 text-sm outline-none focus:border-indigo-300"
              />
            </div>

            <div className="hidden grid-cols-[minmax(220px,2fr)_minmax(120px,1fr)_100px_100px_100px] gap-4 bg-slate-50/70 px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400 md:grid">
              <span>Task name</span>
              <span>Project</span>
              <span>Priority</span>
              <span>Due date</span>
              <span>Status</span>
            </div>

            <div className="divide-y divide-slate-100">
              {filteredTasks.map((task) => (
                <div
                  key={task.id}
                  className="grid grid-cols-1 gap-3 px-5 py-4 transition hover:bg-slate-50/70 md:grid-cols-[minmax(220px,2fr)_minmax(120px,1fr)_100px_100px_100px] md:items-center md:gap-4"
                >
                  <div className="flex min-w-0 items-start gap-3">
                    <button
                      aria-label={`Mark ${task.title} ${
                        task.status === "Done" ? "incomplete" : "complete"
                      }`}
                      onClick={() => toggleTask(task.id)}
                      className={`mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border transition ${
                        task.status === "Done"
                          ? "border-emerald-500 bg-emerald-500 text-white"
                          : "border-slate-300 text-transparent hover:border-indigo-500"
                      }`}
                    >
                      {task.status === "Done" && <Check size={12} />}
                    </button>
                    <span
                      className={`text-sm ${
                        task.status === "Done"
                          ? "text-slate-400 line-through"
                          : "font-medium text-slate-700"
                      }`}
                    >
                      {task.title}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 pl-8 md:pl-0">
                    <span
                      className={`flex h-6 w-6 items-center justify-center rounded-md text-[9px] font-bold ${task.color}`}
                    >
                      {task.initials}
                    </span>
                    <span className="text-xs text-slate-500">
                      {task.project}
                    </span>
                  </div>

                  <div className="pl-8 md:pl-0">
                    <Priority priority={task.priority} />
                  </div>

                  <div className="flex items-center gap-1.5 pl-8 text-xs text-slate-500 md:pl-0">
                    <CalendarDays size={14} className="text-slate-400" />
                    {task.due}
                  </div>

                  <div className="pl-8 md:pl-0">
                    <Status status={task.status} />
                  </div>
                </div>
              ))}

              {filteredTasks.length === 0 && (
                <div className="px-5 py-12 text-center">
                  <Search className="mx-auto mb-3 text-slate-300" size={25} />
                  <p className="text-sm font-semibold text-slate-700">
                    No tasks found
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    Try another search or change the filter.
                  </p>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between border-t border-slate-100 px-5 py-4">
              <p className="text-xs text-slate-400">
                Showing {filteredTasks.length} of {tasks.length} demo tasks
              </p>
              <button
                onClick={() => {
                  setActiveNav("My Tasks");
                  setFilter("All");
                  setSearch("");
                }}
                className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800"
              >
                View my tasks <ArrowRight size={14} />
              </button>
            </div>
          </section>

          <div className="mt-6 flex flex-col items-center justify-between gap-2 pb-4 text-center text-[11px] text-slate-400 sm:flex-row sm:text-left">
            <p>© 2026 TeamFlow. Organize work. Achieve more.</p>
            <p className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Demo mode · Sample data
            </p>
          </div>
        </div>
      </main>

      {showCreate && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm"
          onClick={() => setShowCreate(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="create-task-title"
            className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-5 flex items-start justify-between">
              <div>
                <h3
                  id="create-task-title"
                  className="text-lg font-bold text-slate-900"
                >
                  Create a task
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Add a task to your TeamFlow workspace.
                </p>
              </div>
              <button
                aria-label="Close dialog"
                onClick={() => setShowCreate(false)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                createTask();
              }}
            >
              <label
                htmlFor="task-title"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Task name
              </label>
              <input
                id="task-title"
                autoFocus
                required
                value={newTask}
                onChange={(event) => setNewTask(event.target.value)}
                placeholder="e.g. Build the login page"
                className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50"
              />
              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowCreate(false)}
                  className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
                >
                  Add task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({
  title,
  value,
  note,
  icon,
  iconColor,
  trend,
  trendUp,
  warning,
}: {
  title: string;
  value: string;
  note: string;
  icon: React.ReactNode;
  iconColor: string;
  trend: string;
  trendUp?: boolean;
  warning?: boolean;
}) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5 transition hover:shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <p className="text-xs font-medium text-slate-500">{title}</p>
        <div
          className={`flex h-9 w-9 items-center justify-center rounded-lg ${iconColor}`}
        >
          {icon}
        </div>
      </div>
      <p className="text-[30px] font-bold tracking-tight text-slate-900">
        {value}
      </p>
      <p className="mt-1 text-xs text-slate-400">{note}</p>
      <div className="mt-4 flex items-center gap-1.5 border-t border-slate-100 pt-3">
        {trendUp ? (
          <ArrowUpRight size={14} className="text-emerald-600" />
        ) : warning ? (
          <ArrowDownRight size={14} className="text-amber-600" />
        ) : (
          <Sparkles size={13} className="text-indigo-500" />
        )}
        <span
          className={`text-[11px] font-medium ${
            trendUp
              ? "text-emerald-600"
              : warning
                ? "text-amber-600"
                : "text-slate-500"
          }`}
        >
          {trend}
        </span>
      </div>
    </article>
  );
}

function Priority({ priority }: { priority: Task["priority"] }) {
  const styles = {
    High: "bg-rose-50 text-rose-700",
    Medium: "bg-amber-50 text-amber-700",
    Low: "bg-slate-100 text-slate-600",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-[10px] font-semibold ${styles[priority]}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {priority}
    </span>
  );
}

function Status({ status }: { status: Task["status"] }) {
  const styles = {
    "In Progress": "bg-blue-50 text-blue-700",
    "To Do": "bg-slate-100 text-slate-600",
    Done: "bg-emerald-50 text-emerald-700",
  };

  return (
    <span
      className={`inline-flex whitespace-nowrap rounded-md px-2 py-1 text-[10px] font-semibold ${styles[status]}`}
    >
      {status}
    </span>
  );
}
