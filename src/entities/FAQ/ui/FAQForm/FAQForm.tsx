import { Edit2, PlusCircle, Save, Trash2, X } from 'lucide-react';
import { useState } from 'react';
import { Stack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
import { Button } from '@/shared/ui/Button';
import { DataFAQ } from '../../model/types/types';
import styles from './FAQForm.module.scss';

interface FAQFormProps {
    faqs: DataFAQ[];
    onChange: (faqs: DataFAQ[]) => void;
}

export const FAQForm = (props: FAQFormProps) => {
    const { faqs, onChange } = props;

    const [newQuestion, setNewQuestion] = useState('');
    const [newAnswer, setNewAnswer] = useState('');
    const [editIndex, setEditIndex] = useState<number | null>(null);

    const handleAddFAQ = () => {
        if (newQuestion.trim() && newAnswer.trim()) {
            const updatedFaqs = [...faqs, { question: newQuestion, answer: newAnswer }];
            onChange(updatedFaqs);
            setNewQuestion('');
            setNewAnswer('');
        }
    };

    const handleEdit = (index: number) => {
        setEditIndex(index);
        setNewQuestion(faqs[index].question);
        setNewAnswer(faqs[index].answer);
    };

    const handleSaveEdit = () => {
        if (editIndex !== null && newQuestion.trim() && newAnswer.trim()) {
            const updatedFaqs = [...faqs];
            updatedFaqs[editIndex] = { question: newQuestion, answer: newAnswer };
            onChange(updatedFaqs);
            setEditIndex(null);
            setNewQuestion('');
            setNewAnswer('');
        }
    };

    const handleDelete = (index: number) => {
        if (faqs[index].question === "Какие документы необходимы?") {
            return;
        }
        const updatedFaqs = faqs.filter((_, i) => i !== index);
        onChange(updatedFaqs);
    };

    const handleCancel = () => {
        setEditIndex(null);
        setNewQuestion('');
        setNewAnswer('');
    };

    return (
        <Stack direction='column' max gap='32'>
            <Stack direction='column' gap='24' max>
                <Text size='18' font='geometria500'>
                    {editIndex !== null ? 'Редактировать вопрос' : 'Добавить новый вопрос'}
                </Text>

                <Stack max direction='column' gap='16'>
                    <Stack direction='column' gap='8' max>
                        <label className={styles.label}>Вопрос</label>
                        <input
                            type="text"
                            value={newQuestion}
                            onChange={(e) => setNewQuestion(e.target.value)}
                            className={styles.input}
                            placeholder="Введите вопрос"
                            disabled={editIndex === 0}
                        />
                    </Stack>
                    <Stack direction='column' gap='8' max>
                        <label className={styles.label}>Ответ</label>
                        <textarea
                            value={newAnswer}
                            onChange={(e) => setNewAnswer(e.target.value)}
                            rows={4}
                            className={styles.textarea}
                            placeholder="Введите ответ"
                        />
                    </Stack>
                    <Stack gap='16'>
                        {editIndex !== null ? (
                            <>
                                <Button
                                    type='button'
                                    onClick={handleSaveEdit}
                                    className={styles.btn}
                                >
                                    <Save size={20} /> Сохранить
                                </Button>

                                <Button
                                    type='button'
                                    color='outline'
                                    onClick={handleCancel}
                                    className={styles.btn}
                                >
                                    <X size={20} /> Отменить
                                </Button>
                            </>
                        ) : (
                            <Button
                                type='button'
                                onClick={handleAddFAQ}
                                className={styles.btn}
                            >
                                <PlusCircle size={20} /> Добавить
                            </Button>
                        )}
                    </Stack>
                </Stack>
            </Stack>

            <Stack direction='column' gap='16' max>
                <Text size='18' font='geometria500'>
                    Список вопросов
                </Text>

                {faqs.map((faq, index) => (
                    <div key={index} className={styles.faqItem}>
                        <Stack justify='between'>
                            <Text size='18' font='geometria500'>{faq.question}</Text>
                            <Stack gap='8'>
                                <button
                                    type='button'
                                    onClick={() => handleEdit(index)} className={styles.editButton}
                                >
                                    <Edit2 size={20} />
                                </button>
                                {index !== 0 && (
                                    <button
                                        type='button'
                                        onClick={() => handleDelete(index)} className={styles.deleteButton}
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                )}
                            </Stack>
                        </Stack>
                        <Text size='18'>
                            {faq.answer}
                        </Text>
                    </div>
                ))}
            </Stack>
        </Stack>
    );
};