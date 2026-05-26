import { useState, useMemo, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CircularProgress from '@mui/material/CircularProgress';
import { DataGrid } from '@mui/x-data-grid';
import { getArticles, createArticle, updateArticle, toggleArticleStatus } from '../../ArticleService';

const emptyForm = {
  name: '',
  title: '',
  content: '',
  image: '',
  status: 'Active',
};

function validate(form) {
  const errors = {};
  if (!form.name) errors.name = 'Slug is required.';
  if (!form.title) errors.title = 'Title is required.';
  if (!form.content) errors.content = 'Content is required.';
  return errors;
}

function mapArticle(a) {
  return {
    id: a._id,
    slug: a.name,
    title: a.title,
    paragraphs: a.content?.length ?? 0,
    preview: a.content?.[0]?.substring(0, 50) ?? '',
    image: a.image ?? '',
    status: a.status,
  };
}

function DashArticleListPage() {
  const [articlesData, setArticlesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  const [editOpen, setEditOpen] = useState(false);
  const [editForm, setEditForm] = useState(null);
  const [editErrors, setEditErrors] = useState({});

  useEffect(() => {
    getArticles()
      .then((data) => setArticlesData(data.map(mapArticle)))
      .finally(() => setLoading(false));
  }, []);

  const filteredArticles = useMemo(() => {
    return articlesData.filter((article) => {
      const searchLower = search.toLowerCase();
      const matchesSearch =
        search === '' ||
        article.slug?.toLowerCase().includes(searchLower) ||
        article.title?.toLowerCase().includes(searchLower) ||
        article.preview?.toLowerCase().includes(searchLower);
      const matchesStatus = statusFilter === '' || article.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [articlesData, search, statusFilter]);

  // --- Add ---
  const handleOpen = () => { setForm(emptyForm); setErrors({}); setOpen(true); };
  const handleClose = () => setOpen(false);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };
  const handleSubmit = async () => {
    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) { setErrors(validationErrors); return; }
    try {
      const created = await createArticle({
        name: form.name,
        title: form.title,
        content: form.content.split('\n').filter((line) => line.trim() !== ''),
        image: form.image,
        status: form.status,
      });
      setArticlesData((prev) => [...prev, mapArticle(created)]);
      setOpen(false);
    } catch {
      setErrors({ general: 'Failed to create article. Please try again.' });
    }
  };

  // --- Toggle Status ---
  const handleToggleStatus = async (id) => {
    try {
      const updated = await toggleArticleStatus(id);
      setArticlesData((prev) =>
        prev.map((a) => a.id === id ? { ...a, status: updated.status } : a)
      );
    } catch {
      console.error('Failed to toggle status.');
    }
  };

  // --- Edit ---
  const handleEditOpen = (row) => { setEditForm({ ...row }); setEditErrors({}); setEditOpen(true); };
  const handleEditClose = () => setEditOpen(false);
  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
    setEditErrors({ ...editErrors, [e.target.name]: '' });
  };
  const handleEditSubmit = async () => {
    const validationErrors = validate({ name: editForm.slug, title: editForm.title, content: editForm.content });
    if (Object.keys(validationErrors).length > 0) { setEditErrors(validationErrors); return; }
    try {
      const updated = await updateArticle(editForm.id, {
        name: editForm.slug,
        title: editForm.title,
        content: typeof editForm.content === 'string'
          ? editForm.content.split('\n').filter((line) => line.trim() !== '')
          : editForm.content,
        image: editForm.image,
        status: editForm.status,
      });
      setArticlesData((prev) =>
        prev.map((a) => a.id === editForm.id ? mapArticle(updated) : a)
      );
      setEditOpen(false);
    } catch {
      setEditErrors({ general: 'Failed to update article. Please try again.' });
    }
  };

  const columns = [
    {
      field: 'id', headerName: 'ID', width: 70,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
          <Typography variant="body2" sx={{ fontFamily: 'monospace', fontWeight: 600 }}>
            {`A${params.value.toString().slice(-4).toUpperCase()}`}
          </Typography>
        </Box>
      ),
    },
    { field: 'slug', headerName: 'Slug', flex: 1, minWidth: 120 },
    { field: 'title', headerName: 'Title', flex: 1.5, minWidth: 150 },
    { field: 'paragraphs', headerName: 'Paragraphs', width: 100, type: 'number' },
    { field: 'preview', headerName: 'Preview', flex: 2, minWidth: 200 },

    {
      field: 'status', headerName: 'Status', width: 100,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={params.value === 'Active' ? 'success' : 'default'}
          size="small"
        />
      ),
    },
    {
      field: 'actions', headerName: 'Actions', width: 180, sortable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={1} alignItems="center" sx={{ height: '100%' }}>
          <Button
            variant="outlined"
            size="small"
            onClick={() => handleEditOpen(params.row)}
            sx={{ minWidth: 55, fontSize: 11 }}
          >
            EDIT
          </Button>
          <Button
            variant="contained"
            size="small"
            onClick={() => handleToggleStatus(params.row.id)}
            sx={{
              minWidth: 85,
              fontSize: 11,
              bgcolor: params.row.status === 'Active' ? '#e65c00' : '#2e7d32',
              '&:hover': {
                bgcolor: params.row.status === 'Active' ? '#bf4500' : '#1b5e20',
              },
            }}
          >
            {params.row.status === 'Active' ? 'DISABLE' : 'ACTIVATE'}
          </Button>
        </Stack>
      ),
    },
  ];

  return (
    <Box sx={{ width: '100%', overflow: 'hidden' }}>
      {/* Header + Add Button */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Typography variant="h4">Articles</Typography>
        <Button variant="contained" onClick={handleOpen}>+ Add Article</Button>
      </Stack>

      {/* Search & Filter */}
      <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom>Search Articles</Typography>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
          <TextField
            label="Search"
            placeholder="Search by slug, title, or preview..."
            variant="outlined"
            size="small"
            sx={{ flex: 2 }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <FormControl size="small" sx={{ flex: 1 }}>
            <InputLabel>Status Filter</InputLabel>
            <Select value={statusFilter} label="Status Filter" onChange={(e) => setStatusFilter(e.target.value)}>
              <MenuItem value="">All Statuses</MenuItem>
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Paper>

      {/* Articles Table */}
      <Paper elevation={2} sx={{ p: 2, width: '100%', overflow: 'hidden' }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
            <CircularProgress />
          </Box>
        ) : (
          <DataGrid
            rows={filteredArticles}
            columns={columns}
            initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
            pageSizeOptions={[10, 25]}
            disableRowSelectionOnClick
            autoHeight
            sx={{ border: 0 }}
          />
        )}
      </Paper>

      {/* Add Article Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Article</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            {errors.general && <Typography color="error" variant="body2">{errors.general}</Typography>}
            <TextField
              label="Slug" name="name" fullWidth size="small"
              value={form.name} onChange={handleChange}
              error={!!errors.name} helperText={errors.name ?? 'URL-friendly identifier (e.g. my-article)'}
            />
            <TextField
              label="Title" name="title" fullWidth size="small"
              value={form.title} onChange={handleChange}
              error={!!errors.title} helperText={errors.title}
            />
            <TextField
              label="Image URL (optional)" name="image" fullWidth size="small"
              value={form.image} onChange={handleChange}
              helperText="Direct image URL for the article thumbnail"
            />
            <TextField
              label="Content" name="content" fullWidth size="small" multiline rows={6}
              value={form.content} onChange={handleChange}
              error={!!errors.content}
              helperText={errors.content ?? 'Each new line = a new paragraph'}
            />
            <FormControl size="small" fullWidth>
              <InputLabel>Status</InputLabel>
              <Select name="status" value={form.status} label="Status" onChange={handleChange}>
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>Add Article</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Article Dialog */}
      <Dialog open={editOpen} onClose={handleEditClose} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Article</DialogTitle>
        <DialogContent>
          {editForm && (
            <Stack spacing={2} sx={{ mt: 1 }}>
              {editErrors.general && <Typography color="error" variant="body2">{editErrors.general}</Typography>}
              <TextField
                label="Slug" name="slug" fullWidth size="small"
                value={editForm.slug ?? ''} onChange={handleEditChange}
                error={!!editErrors.name} helperText={editErrors.name}
              />
              <TextField
                label="Title" name="title" fullWidth size="small"
                value={editForm.title ?? ''} onChange={handleEditChange}
                error={!!editErrors.title} helperText={editErrors.title}
              />
              <TextField
                label="Image URL (optional)" name="image" fullWidth size="small"
                value={editForm.image ?? ''} onChange={handleEditChange}
                helperText="Direct image URL for the article thumbnail"
              />
              <TextField
                label="Content" name="content" fullWidth size="small" multiline rows={6}
                value={
                  Array.isArray(editForm.content)
                    ? editForm.content.join('\n')
                    : editForm.content ?? ''
                }
                onChange={handleEditChange}
                error={!!editErrors.content}
                helperText={editErrors.content ?? 'Each new line = a new paragraph'}
              />
              <FormControl size="small" fullWidth>
                <InputLabel>Status</InputLabel>
                <Select name="status" value={editForm.status} label="Status" onChange={handleEditChange}>
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Inactive">Inactive</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button variant="contained" onClick={handleEditSubmit}>Save Changes</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default DashArticleListPage;