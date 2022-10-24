import clsx from 'clsx';
import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import FormField from './ui/FormField';

const Create = ({
  setIsCreateOpen,
  bills,
  setBills,
  newDocumentId,
  session,
  currentDate,
}) => {
  const formatDateForDateTimeInputValue = (date) =>
    new Date(date.getTime() + date.getTimezoneOffset() * -60 * 1000)
      .toISOString()
      .slice(0, 16);
  const defaultTitle = 'Document ' + newDocumentId;
  const initialFormState = {
    title: defaultTitle || '',
    description: '',
    qr_code_link: '',
    date: formatDateForDateTimeInputValue(currentDate),
    // images: [],
  };

  const [formState, setFormState] = useState(initialFormState);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setFormState({
      ...formState,
      title: 'Document ' + newDocumentId,
      date: formatDateForDateTimeInputValue(currentDate),
    });
  }, [newDocumentId, currentDate]);

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
      date: new Date(formState.date).toISOString(), // assure that all dates in DB are in UTC
      id: nanoid(),
      user_id: session.user.id,
    };
    await insertBill(data);
    setBills([...bills, data]);
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
        value={formState.title}
        onChange={handleValueChange}
      />
      <FormField
        type="textarea"
        name="description"
        id="description"
        label="Description (optional)"
        onChange={handleValueChange}
      />
      <FormField
        type="datetime-local"
        name="date"
        id="date"
        label="Date"
        value={formState.date}
        onChange={handleValueChange}
      />

      <div className="formSection">
        <button
          type="button"
          className="btn btn-outline"
          onClick={() => setFormState({ ...formState, qr_code_link: 'link' })}
        >
          Scan QR Code
        </button>
        {formState.qr_code_link !== '' && (
          <FormField
            name="qr_code_link"
            id="qr_code_link"
            label="QR Code link"
            value={formState.qr_code_link}
            onChange={handleValueChange}
          />
        )}
      </div>

      <div>
        <button type="button" className="btn btn-outline">
          Add a photo
        </button>
      </div>

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
