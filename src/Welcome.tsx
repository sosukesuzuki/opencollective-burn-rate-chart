function Welcome({ onBrowse }: { onBrowse: (file: File) => void }) {
  return (
    <div>
      <p>
        Welcome to the OpenCollective Burn Rate Chart. Use it to create a burn
        rate chart based on CSV data downloaded from{" "}
        <a href="https://opencollective.com">OpenCollective</a>.
      </p>
      <input
        type="file"
        accept=".csv"
        onChange={(event) => {
          if (
            event.target.files === null ||
            event.target.files.length === 0 ||
            event.target.files.length > 1
          ) {
            return;
          }
          const file = event.target.files[0];
          onBrowse(file);
        }}
      />
    </div>
  );
}

export { Welcome };
