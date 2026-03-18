const PageHeader = ({ icon: Icon, title, description }) => {
  return (
    <div className="space-y-2">
      {Icon && <Icon className="size-8 lg:size-10" />}
      <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
      {description && (
        <p className="text-muted-foreground mt-1">{description}</p>
      )}
    </div>
  );
};

export default PageHeader;
