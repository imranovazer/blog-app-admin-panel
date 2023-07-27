import React, { useContext, useEffect, useState } from "react";
import Button from "@mui/joy/Button";
import { useNavigate } from "react-router-dom";
import { Table } from "@mui/joy";
import EventsApi from "./api";
import { AlertContex } from "../../contex/AlertContex";

function Events() {
  const { displayAlert } = useContext(AlertContex);
  const [events, setEvents] = useState([]);
  console.log(events);
  const navigate = useNavigate();

  const getData = async () => {
    const res = await EventsApi.getAllEvents();

    setEvents(res);
  };
  useEffect(() => {
    getData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await EventsApi.deleteEventById(id);
      getData();
      displayAlert(true, "Event deleted successfully");
    } catch (error) {
      displayAlert(false, "Unable to delete event");
    }
  };
  return (
    <div className="container mx-auto flex flex-col gap-4">
      <Button onClick={() => navigate("/create-event")}>Crete new event</Button>
      <h1 className="text-[32px] font-bold">Event</h1>
      <div className="rounded-xl shadow-lg bg-slate-100  p-3 ">
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Date</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>
            {events?.length > 0 ? (
              events.map((event) => (
                <tr key={event.id}>
                  <td>{event.id}</td>
                  <td>{event?.locales[0].title}</td>
                  <td>{event?.date}</td>
                  <td>
                    <Button
                      color="warning"
                      onClick={() => {
                        navigate(`/event/${event.id}`);
                      }}
                    >
                      Edit
                    </Button>
                  </td>
                  <td>
                    <Button
                      color="danger"
                      onClick={() => handleDelete(event.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <th colSpan={5}>Events not found</th>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default Events;
