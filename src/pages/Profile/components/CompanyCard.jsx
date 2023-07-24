import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";

import Typography from "@mui/joy/Typography";

export default function CompanyCard({
  onEditClick,
  onDeleteClick,
  companyName,
  imageUrl,
}) {
  return (
    <Card sx={{ width: 320 }}>
      <div>
        <Typography level="h2" fontSize="md" sx={{ mb: 0.5 }}>
          {companyName}
        </Typography>
      </div>
      <AspectRatio minHeight="60px" maxHeight="60px">
        <img src={imageUrl} srcSet={imageUrl} loading="lazy" alt="company" />
      </AspectRatio>
      <div className="flex justify-between ">
        <Button color="warning" onClick={onEditClick}>
          Edit
        </Button>
        <Button color="danger" onClick={onDeleteClick}>
          Delete
        </Button>
      </div>
    </Card>
  );
}
