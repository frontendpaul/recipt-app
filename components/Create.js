import clsx from 'clsx';
import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import FormField from './ui/FormField';

const Create = ({ setIsCreateOpen, setBills, newDocumentId, session }) => {
  const initialFormState = {
    title: '',
    description: '',
    // date: '',
    qr_code_link: '',
    // images: [],
  };
  const [formState, setFormState] = useState(initialFormState);
  const [defaultTitle, setDefaultTitle] = useState('Document_' + newDocumentId);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setDefaultTitle('Document_' + newDocumentId);
    setFormState({
      ...formState,
      title: 'Document_' + newDocumentId,
    });
  }, [newDocumentId]);

  const handleValueChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      ...formState,
      id: nanoid(),
      user_id: session.user.id,
    };
    await insertBill(data);
    setBills((bills) => [...bills, data]);
    setIsCreateOpen(false);
  };

  const insertBill = async (data) => {
    setIsLoading(true);
    let { error } = await supabase.from('bills').insert(data);
    if (error) console.log('error', error);
    else {
      setIsLoading(false);
    }
  };

  return (
    <form className="cardPadding createForm" onSubmit={handleSubmit}>
      <FormField
        name="title"
        id="title"
        label="Title"
        value={defaultTitle}
        onChange={handleValueChange}
      />
      <FormField
        type="textarea"
        name="description"
        id="description"
        label="Description (optional)"
        onChange={handleValueChange}
      />

      <button type="submit" className="btn btn-primary">
        Create new
      </button>

      <div className={clsx('loader', isLoading && 'visible')}>
        <span className="loaderIcon"></span>
      </div>
    </form>
  );
};
export default Create;
