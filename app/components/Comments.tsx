import {
  Input,
  List,
  Form,
  Button,
  Comment,
  Avatar,
  Pagination,
  Modal,
  notification,
} from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import useViewModel from "../views/ProductPage/viewModel";
const { TextArea } = Input;

interface CommentItem {
  id: string;
  content: any;
  product: string;
  user: string;
  avatar: string;
  datetime: string;
}

interface EditorProps {
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: () => void;
  submitting: boolean;
  value: string;
  user: any;
}

const deleteNotification = () => {
  notification.open({
    message: "Comment Deleted",
    description: "Your comment is successfuly deleted.",
    onClick: () => {
      console.log("Notification Clicked!");
    },
  });
};

const CommentList = ({
  comments,
  user,
  setComments,
}: {
  comments: CommentItem[];
  user: any;
  setComments: any;
}) => {
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(5);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [commentToEdit, setCommentToEdit] = useState<any>(null);
  const [editStr, setEditStr] = useState("");
  const { deleteComment, editComment } = useViewModel();

  const itemPerPage = 5;
  const handlePagination = (value: any) => {
    setMinValue((value - 1) * itemPerPage);
    setMaxValue(value * itemPerPage);
  };

  const handleOk = async () => {
    setIsModalOpen(false);
    let edit = commentToEdit;
    edit.content = editStr;
    await editComment(edit.id, edit.product, editStr, edit.user);
    setCommentToEdit(null);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setCommentToEdit(null);
  };

  async function deleteCommentWithId(id: any) {
    await deleteComment(id);
    let newComments = comments.filter((comment) => comment.id != id);
    setComments(newComments);
    deleteNotification();
  }

  async function editCommentWithId(id: any) {
    const edit = comments.filter((comment) => comment.id == id)[0];
    setCommentToEdit(edit);
    setEditStr(edit.content);
    setIsModalOpen(true);
  }

  function commentEditHandler(str: any) {
    setEditStr(str);
  }

  const actions = [
    <span
      name="edit"
      value="edit"
      key="comment-basic-reply-to"
      onClick={(c) => {
        editCommentWithId(
          c.currentTarget.parentNode?.parentNode?.parentNode?.parentNode
            ?.parentElement?.id
        );
      }}
    >
      Edit
    </span>,
    <span
      name="delete"
      value="delete"
      key="comment-basic-reply-to"
      onClick={(c) => {
        deleteCommentWithId(
          c.currentTarget.parentNode?.parentNode?.parentNode?.parentNode
            ?.parentElement?.id
        );
      }}
    >
      Delete
    </span>,
  ];

  return (
    <>
      <List
        dataSource={comments.slice(minValue, maxValue)}
        header={`${comments.length} ${
          comments.length > 1 ? "replies" : "reply"
        }`}
        itemLayout="horizontal"
        renderItem={(props) => (
          <>
            <Comment {...props} actions={props.user == user ? actions : []} />
          </>
        )}
      />
      <Pagination
        defaultCurrent={1}
        total={comments.length}
        defaultPageSize={5}
        onChange={handlePagination}
      />

      <Modal
        title="Edit Comment"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <TextArea
          rows={4}
          value={editStr}
          onChange={(e) => commentEditHandler(e.target.value)}
        />
      </Modal>
    </>
  );
};

const Editor = ({
  onChange,
  onSubmit,
  submitting,
  value,
  user,
}: EditorProps) => (
  <>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <form method="post">
        <input
          type="hidden"
          name="data"
          defaultValue={JSON.stringify({ value: value, user: user })}
        />
        <Button
          htmlType="submit"
          loading={submitting}
          onClick={onSubmit}
          type="primary"
        >
          Add Comment
        </Button>
      </form>
    </Form.Item>
  </>
);

function Comments({ data, user, product }: any) {
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState("");
  const { createComment } = useViewModel();

  useEffect(() => {
    setComments(data);
  }, []);

  const handleSubmit = async () => {
    event?.preventDefault();
    if (!value) return;
    const res = await createComment(product.id, value, user);
    setValue("");
    setComments([
      ...comments,
      {
        id: res.id,
        user: user,
        avatar:
          "https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png",
        content: value,
        product: product.id,
        datetime: moment(Date.now()).fromNow(),
      },
    ]);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };
  return (
    <>
      {comments.length > 0 && (
        <CommentList
          comments={comments}
          user={user}
          setComments={setComments}
        />
      )}
      <Comment
        avatar={
          <Avatar
            src="https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png"
            alt="User avatar"
          />
        }
        content={
          <Editor
            onChange={handleChange}
            onSubmit={handleSubmit}
            submitting={submitting}
            user={user}
            value={value}
          />
        }
      />
    </>
  );
}

export default Comments;
