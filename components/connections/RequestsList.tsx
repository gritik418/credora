import ConnectionRequestCard from "./ConnectionRequestCard";

interface RequestsListProps {
  requests: any[];
}

const RequestsList = ({ requests }: RequestsListProps) => {
  return (
    <div className="grid grid-cols-1 gap-3 xl:grid-cols-2">
      {requests.map((request) => (
        <ConnectionRequestCard key={request.id} request={request} />
      ))}
    </div>
  );
};

export default RequestsList;
