const AddedThread = require("../../../Domains/threads/entities/AddedThread");
const AddThread = require("../../../Domains/threads/entities/AddThread");
const ThreadRepository = require("../../../Domains/threads/ThreadRepository");
const ThreadUseCase = require("../ThreadUseCase");

describe("ThreadUseCase", () => {
  it("should set the add thread action correctly", async () => {
    // Arrange
    const useCasePayload = {
      title: "title thread",
      body: "body thread",
      owner: "user-123",
    };
    const expectedAddedThread = new AddedThread({
      id: "thread-123",
      title: useCasePayload.title,
      body: useCasePayload.body,
      owner: useCasePayload.owner,
      date: new Date().toISOString(),
      is_delete: 0,
    });

    const mockThreadRepository = new ThreadRepository();
    mockThreadRepository.addThread = jest
      .fn()
      .mockImplementation(() => Promise.resolve(expectedAddedThread));
    const threadUseCase = new ThreadUseCase({
      threadRepository: mockThreadRepository,
    });

    //   Action
    const addedThread = await threadUseCase.addThread(useCasePayload);

    //   Assert
    expect(addedThread).toStrictEqual(expectedAddedThread);
    expect(mockThreadRepository.addThread).toBeCalledWith(new AddThread(useCasePayload));
  });
});
