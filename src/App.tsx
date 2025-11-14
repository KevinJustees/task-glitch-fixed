import { 
  useState, 
  useCallback, 
  useMemo 
} from "react";

import { Box, Container, Stack } from "@mui/material";

import { useTasksContext } from "@/context/TasksContext";
import { useUser } from "@/hooks/useUser";

import UndoSnackbar from "@/components/UndoSnackbar";

import { Task, ActivityItem } from "@/types";

function AppContent() {
  const { 
    loading, 
    error, 
    metrics, 
    derivedSorted, 
    addTask, 
    updateTask, 
    deleteTask, 
    undoDelete, 
    lastDeleted,
    clearLastDeleted   //added
  } = useTasksContext();

  const [q, setQ] = useState('');
  const [fStatus, setFStatus] = useState<string>('All');
  const [fPriority, setFPriority] = useState<string>('All');
  const { user } = useUser();
  const [activity, setActivity] = useState<ActivityItem[]>([]);

  const [snackbarOpen, setSnackbarOpen] = useState(false);  //added local control

  const createActivity = useCallback((type: ActivityItem['type'], summary: string): ActivityItem => ({
    id: (typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`),
    ts: Date.now(),
    type,
    summary,
  }), []);

  const filtered = useMemo(() => {
    return derivedSorted.filter(t => {
      if (q && !t.title.toLowerCase().includes(q.toLowerCase())) return false;
      if (fStatus !== 'All' && t.status !== fStatus) return false;
      if (fPriority !== 'All' && t.priority !== fPriority) return false;
      return true;
    });
  }, [derivedSorted, q, fStatus, fPriority]);

  const handleAdd = useCallback((payload: Omit<Task, 'id'>) => {
    addTask(payload);
    setActivity(prev => [createActivity('add', `Added: ${payload.title}`), ...prev].slice(0, 50));
  }, [addTask, createActivity]);

  const handleUpdate = useCallback((id: string, patch: Partial<Task>) => {
    updateTask(id, patch);
    setActivity(prev => [createActivity('update', `Updated: ${Object.keys(patch).join(', ')}`), ...prev].slice(0, 50));
  }, [updateTask, createActivity]);

  const handleDelete = useCallback((id: string) => {
    deleteTask(id);
    setSnackbarOpen(true);              //open snackbar properly
    setActivity(prev => [createActivity('delete', `Deleted task ${id}`), ...prev].slice(0, 50));
  }, [deleteTask, createActivity]);

  const handleUndo = useCallback(() => {
    undoDelete();
    setSnackbarOpen(false);            //close snackbar
    clearLastDeleted();                //reset last deleted
    setActivity(prev => [createActivity('undo', 'Undo delete'), ...prev].slice(0, 50));
  }, [undoDelete, clearLastDeleted, createActivity]);

  const handleCloseUndo = () => {
    setSnackbarOpen(false);            //close snackbar
    clearLastDeleted();                //clear deleted state
  };

  return (
    <Box sx={{ minHeight: '100dvh', bgcolor: 'background.default' }}>
      <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
        <Stack spacing={3}>
          

          <UndoSnackbar 
            open={snackbarOpen} 
            onClose={handleCloseUndo} 
            onUndo={handleUndo} 
          />

        </Stack>
      </Container>
    </Box>
  );
}
