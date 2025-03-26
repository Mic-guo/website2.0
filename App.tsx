import { Fragment, useMemo, useState } from "react";
import { data } from "react-router-dom";

type Event = {
  id: number;
  name: string;
  start: number;
  end: number;
};
const formatHour = (num: number) => {
  if (num === 0 || num === 24) return "12 AM";
  if (num === 12) return "12 PM";

  return num < 12 ? `${num} AM` : `${num - 12} PM`;
};

const calculatePos = (eventStart: number, eventEnd: number) => {
  const top = eventStart * 128;
  const height = (eventEnd - eventStart) * 128;

  return {
    top: `${top + 64}px`,
    height: `${height}px`,
  };
};

function App() {
  const [curName, setCurName] = useState("");
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [events, setEvents] = useState<Event[]>([]);
  const [curId, setCurId] = useState(0);
  const [curEvent, setCurEvent] = useState<Event | null>(null);
  const curEvent = events.find((event) => event.id === curId);

  const day = new Date();

  const handleCreateEvent = () => {
    if (curEvent !== null) {
      setEvents((prev) => {
        return prev.map((prevEvent) => {
          if (prevEvent.id !== curEvent.id) return prevEvent;

          return {
            ...prevEvent,
            name: curName,
            start: startTime,
            end: endTime,
          };
        });
      });
    } else {
      const newEvent = {
        name: curName,
        start: startTime,
        end: endTime,
        id: curId,
      };

      setEvents((prev) => [...prev, newEvent]);
      setCurId((prev) => prev + 1);
    }

    setCurName("");
    setStartTime(0);
    setEndTime(0);
  };

  const editEvent = (event: Event) => {
    setCurEvent(event);
    setCurName(event.name);
    setStartTime(event.start);
    setEndTime(event.end);
  };

  const handleDelete = (event: Event) => {
    setEvents((prev) => prev.filter((prevEvent) => prevEvent.id !== event.id));
    setCurEvent(null);
    setCurName("");
    setStartTime(0);
    setEndTime(0);
  };

  return (
    <>
      <div className="">
        <div className=" w-screen justify-center items-center flex flex-col h-64">
          {day.toDateString()}
          <input
            type="text"
            placeholder="name"
            value={curName}
            onChange={(e) => {
              setCurName(e.target.value);
            }}
          />
          <input
            type="number"
            placeholder="start time"
            value={startTime}
            onChange={(e) => {
              setStartTime(parseInt(e.target.value));
            }}
          />
          <input
            type="number"
            placeholder="end time"
            value={endTime}
            onChange={(e) => {
              setEndTime(parseInt(e.target.value));
            }}
          />
          <button onClick={handleCreateEvent}>
            {curEvent ? "Edit Event" : "Save Event"}
          </button>
          {curEvent && (
            <button
              onClick={() => {
                handleDelete(curEvent);
              }}
            >
              Delete Event
            </button>
          )}
        </div>
        <div className="w-full relative">
          {[...Array(25)].map((_, idx) => {
            return (
              <Fragment key={idx}>
                <div
                  className="flex flex-row justify-center items-center w-full h-32"
                  onClick={() => {
                    setStartTime(idx);
                  }}
                >
                  {formatHour(idx)}
                  <div className="border-b-2 grow"></div>
                </div>
              </Fragment>
            );
          })}
          <div className="absolute top-0">
            {events.map((event) => {
              return (
                <div
                  className="absolute bg-blue-200 ml-16 w-32"
                  style={calculatePos(event.start, event.end)}
                  onClick={() => {
                    editEvent(event);
                  }}
                >
                  {event.name}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
