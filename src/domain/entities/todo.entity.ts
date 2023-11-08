export class TodoEntity {
  constructor(
    public id: number,
    public text: string,
    public completedAt: Date | null
  ) {}

  get isCompleted() {
    return !!this.completedAt;
  }
  public static fromObject(object: { [key: string]: any }): TodoEntity {
    const { id, text, completeAt } = object;

    if (!id) throw "Id is required";
    if (!text) throw "Text is required";

    let newCompleteAt;
    if (newCompleteAt) {
      newCompleteAt = new Date(completeAt);

      if (isNaN(newCompleteAt.getTime())) {
        throw "CompleteAt is not a valid date";
      }
    }

    return new TodoEntity(id, text, completeAt);
  }
}
