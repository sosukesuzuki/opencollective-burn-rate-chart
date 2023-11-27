import styles from "./Welcome.module.css";

function Welcome({ onBrowse }: { onBrowse: (file: File) => void }) {
  return (
    <div className={styles.container}>
      <p>Welcome to the OpenCollective Burn Rate Chart.</p>
      <p>
        Use it to create a burn rate chart based on CSV data downloaded from{" "}
        <a href="https://opencollective.com">OpenCollective</a>.
      </p>
      <label className={styles.browseButton} htmlFor="file-uploader">
        Browse
      </label>
      <input
        id="file-uploader"
        type="file"
        accept=".csv"
        style={{ display: "none" }}
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
