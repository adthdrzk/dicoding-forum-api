const AddedThread = require("../AddedThread");

describe("AddedThread", () => {
  it("should throw error when payload did not contain needed property", () => {
    // Arrange
    const payload = {
      id: "thread-123",
      title: "title thread",
      body: "body thread",
      owner: "user-123",
      date: new Date().toISOString(),
    };

    //   Action & Assert
    expect(() => new AddedThread(payload)).toThrowError(
      "ADDED_THREAD.NOT_CONTAIN_NEEDED_PROPERTY"
    );
  });

  it("should throw error when payload did not meet data type specification", () => {
    // Arrange
    const payload = {
      id: "thread-123",
      title: "title thread",
      body: "body thread",
      owner: "user-123",
      date: new Date().toISOString(),
      is_delete: {},
    };

    //   Action & Assert
    expect(() => new AddedThread(payload)).toThrowError(
      "ADDED_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION"
    );
  });

  it("should return object correctly", () => {
    // Arrange
    const payload = {
      id: "thread-123",
      title: "title thread",
      body: "body thread",
      owner: "user-123",
      date: new Date().toISOString(),
      is_delete: 0,
    };

    //   Action
    const { id, title, body, owner, date, is_delete } = new AddedThread(
      payload
    );

    //   Assert
    expect(id).toEqual(payload.id);
    expect(title).toEqual(payload.title);
    expect(body).toEqual(payload.body);
    expect(owner).toEqual(payload.owner);
    expect(date).toEqual(payload.date);
    expect(is_delete).toEqual(payload.is_delete);
  });
});
