import { useEffect, useState } from "react";
import useFetching from "../../hooks/useFetching";
import messageApi from "./api";
import DataTables from "../../components/DataTables";
import { messageHeadings } from "./headings/messageHeaders";
import MessageModal from "./components/MessageModal";
import useLoading from "../../hooks/useLoading";

const Message = () => {
  const [messages, setMessages] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState();

  const [getAllMessages, getIsLoading] = useFetching(async () => {
    const res = await messageApi.getAll();
    console.log(res);
    setMessages(res);
  });

  const [deleteMessage, isLoadingMessage] = useLoading({
    callback: async (id) => {
      await messageApi.deleteById(id);
      setMessages((prev) => prev.filter((message) => message.id !== id));
      setOpen(false);
      setSelectedMessage();
    },
    onError: () => {
      console.log("Error");
    },
  });

  const handleDelete = (id) => {
    deleteMessage(id);
  };

  useEffect(() => {
    getAllMessages();
  }, []);

  return (
    <div>
      <h1 className="text-[32px] font-bold mb-9">Gallery</h1>

      {!getIsLoading && (
        <DataTables
          data={messages}
          columns={messageHeadings}
          onRowClick={(data) => {
            setSelectedMessage(data);
            setOpen(true);
          }}
        />
      )}

      <MessageModal
        open={open}
        setOpen={setOpen}
        message={selectedMessage}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default Message;
