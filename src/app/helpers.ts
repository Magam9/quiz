import { IQuestion } from './core/models';

export interface RemoveQuestionResult {
  updatedQuestions: IQuestion[];
  removed: boolean;
  parentIdOfRemoved: string | null;
}

export function generateRandomId(prefix: string): string {
  return `${prefix}_${(Math.random() + 1).toString(36).substring(2)}`;
}

export interface QuestionTreeNode {
  question: IQuestion;
  depth: number;
  parentId: string | null;
  path: string[];
}

/**
 * Flattens a recursive question tree into a flat list with depth information
 */
export function flattenQuestions(
  questions: IQuestion[],
  depth = 0,
  parentId: string | null = null,
  path: string[] = []
): QuestionTreeNode[] {
  const result: QuestionTreeNode[] = [];
  
  for (const question of questions) {
    const node: QuestionTreeNode = {
      question,
      depth,
      parentId,
      path: [...path, question.id],
    };
    result.push(node);
    
    if (question.subQuestions && question.subQuestions.length > 0 && depth < 1) {
      // Only show up to depth 2 (0 and 1)
      result.push(...flattenQuestions(question.subQuestions, depth + 1, question.id, node.path));
    }
  }
  
  return result;
}

/**
 * Finds a question by ID in a recursive structure
 */
export function findQuestionById(
  questions: IQuestion[],
  id: string
): IQuestion | null {
  for (const question of questions) {
    if (question.id === id) {
      return question;
    }
    if (question.subQuestions && question.subQuestions.length > 0) {
      const found = findQuestionById(question.subQuestions, id);
      if (found) return found;
    }
  }
  return null;
}

/**
 * Updates a question in a recursive structure
 */
export function updateQuestionInTree(
  questions: IQuestion[],
  updatedQuestion: IQuestion
): IQuestion[] {
  return questions.map((q) => {
    if (q.id === updatedQuestion.id) {
      return updatedQuestion;
    }
    if (q.subQuestions && q.subQuestions.length > 0) {
      return {
        ...q,
        subQuestions: updateQuestionInTree(q.subQuestions, updatedQuestion),
      };
    }
    return q;
  });
}

/**
 * Adds a follow-up question to a parent question
 */
export function addFollowUpToQuestion(
  questions: IQuestion[],
  parentId: string,
  newQuestion: IQuestion
): IQuestion[] {
  return questions.map((q) => {
    if (q.id === parentId) {
      return {
        ...q,
        subQuestions: [...(q.subQuestions || []), newQuestion],
      };
    }
    if (q.subQuestions && q.subQuestions.length > 0) {
      return {
        ...q,
        subQuestions: addFollowUpToQuestion(q.subQuestions, parentId, newQuestion),
      };
    }
    return q;
  });
}

/**
 * Calculates total follow-ups count recursively
 */
export function getTotalFollowUps(questions: IQuestion[]): number {
  return questions.reduce((total, q) => {
    const subCount = q.subQuestions ? getTotalFollowUps(q.subQuestions) : 0;
    return total + (q.subQuestions?.length || 0) + subCount;
  }, 0);
}

export function removeQuestionFromTree(
  questions: IQuestion[],
  targetId: string,
  parentId: string | null = null
): RemoveQuestionResult {
  let removed = false;
  let parentIdOfRemoved: string | null = null;

  const updatedQuestions: IQuestion[] = [];

  for (const question of questions) {
    if (question.id === targetId) {
      removed = true;
      parentIdOfRemoved = parentId;
      continue;
    }

    if (question.subQuestions && question.subQuestions.length > 0) {
      const result = removeQuestionFromTree(question.subQuestions, targetId, question.id);
      if (result.removed) {
        removed = true;
        parentIdOfRemoved = result.parentIdOfRemoved;
        updatedQuestions.push({
          ...question,
          subQuestions: result.updatedQuestions,
        });
        continue;
      }
    }

    updatedQuestions.push(question);
  }

  return { updatedQuestions, removed, parentIdOfRemoved };
}
