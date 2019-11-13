import React from 'react';
import CrossIcon from '../icons/cross';
import CheckIcon from '../icons/check';
import Button from './button';

const Area = props => (
  <div>
    {props.children}
    <style jsx>{`
      div {
        margin-top: 2rem;
        margin-bottom: 4rem;
        counter-reset: answer-list;
      }
    `}</style>
  </div>
);

const Answer = ({ value, onChange, selected, readOnly, children }) => (
  <label className={`f5${readOnly ? ' disabled' : ''}`}>
    <input
      type="radio"
      value={value}
      name="answer"
      onChange={onChange}
      disabled={readOnly}
      defaultChecked={selected}
    />
    <span>{children}</span>
    <style jsx>{`
      input {
        display: none;
      }

      input:checked + span {
        color: #111;
        border-color: #111;
        box-shadow: 0 0 0 3px #c1c1c1;
        font-weight: 600;
      }

      label {
        display: block;
        margin: 0.5rem 0;
        ${readOnly ? '' : 'cursor: pointer;'}
      }

      label span:before {
        counter-increment: answer-list;
        content: counter(answer-list, upper-alpha) '. ';
        display: inline-block;
        width: 1.5rem;
      }

      span {
        color: #666;
        display: block;
        padding: 0.5rem 1rem;
        border-radius: 7px;
        border: 1px solid #666;
        transition: box-shadow 0.2s ease;
      }

      .disabled input + span {
        border-color: #eaeaea;
      }

      .disabled input:checked + span {
        color: unset;
        font-weight: 500;
        background: white;
        border-color: #111;
      }
    `}</style>
  </label>
);

const Symbol = ({ correct, selected }) => {
  if (!correct && !selected) {
    return null;
  }

  return (
    <span>
      {correct ? <CheckIcon color="#19ce56" /> : <CrossIcon color="red" />}
      <style jsx>{`
        span {
          display: inline-block;
          lineheight: 1;
          verticalalign: middle;
          marginleft: 0.25rem;
        }
      `}</style>
    </span>
  );
};

const AnswerBox = ({ answers, correctAnswer, record, dispatchRecord }) => (
  <Area>
    {answers.map(answer => (
      <Answer
        key={answer}
        value={answer}
        selected={answer === record.answer}
        onChange={e => dispatchRecord({ type: 'answer', answer: e.target.value })}
        readOnly={record.submitted}
      >
        {answer}{' '}
        {record.submitted && (
          <Symbol correct={answer === correctAnswer} selected={answer === record.answer} />
        )}
      </Answer>
    ))}
    {!record.submitted && (
      <div>
        <Button
          onClick={() => {
            dispatchRecord({ type: 'submit' });
            if (record.answer === correctAnswer) {
              dispatchRecord({ type: 'check' });
            }
          }}
          color="#252525"
          shadowColor="rgba(0, 0, 0, 0.2)"
          invert
        >
          Submit
        </Button>
        <style jsx>{`
          div {
            margin: 2rem 0 4rem;
          }
        `}</style>
      </div>
    )}
  </Area>
);

export default AnswerBox;
