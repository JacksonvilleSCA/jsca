export default function loading() {
  return (
    <>
      <button class="btn btn-outline-dark" type="button" disabled>
        <span
          class="spinner-border spinner-border-sm"
          aria-hidden="true"
        ></span>
        <span role="status">Loading...</span>
      </button>
    </>
  );
}
