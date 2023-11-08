<form>
  <input
    type="file"
    id="docpicker"
    accept=".doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  />
  <h4> OR </h4>
  <textarea name="text" id="docpicker" rows={23} cols={73} defaultValue={" "} />
  <br />
  <br />
  <button type="button" onclick="store()">
    {" "}
    Submit{" "}
  </button>
  <button type="button" >
    {" "}
    Cancel{" "}
  </button>
</form>
