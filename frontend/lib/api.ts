// API 配置和工具函數

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001';

export const api = {
  baseURL: API_BASE_URL,
  
  // 智囊團成員相關 API
  boardMembers: {
    getAll: () => `${API_BASE_URL}/api/board-members`,
    getById: (id: string) => `${API_BASE_URL}/api/board-members/${id}`,
  },
  
  // 聊天相關 API
  chat: {
    sendMessage: () => `${API_BASE_URL}/api/chat/message`,
    getSessions: () => `${API_BASE_URL}/api/chat/sessions`,
  },
  
  // 用戶智囊團相關 API
  userBoard: {
    get: () => `${API_BASE_URL}/api/user-board`,
    update: () => `${API_BASE_URL}/api/user-board`,
  },
};

// 通用 API 請求函數
export async function apiRequest<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  const response = await fetch(url, { ...defaultOptions, ...options });
  
  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.statusText}`);
  }
  
  return response.json();
}

// 獲取智囊團成員
export async function fetchBoardMembers() {
  return apiRequest<{
    success: boolean;
    data: {
      data: any[];
      pagination: any;
    };
  }>(api.boardMembers.getAll());
}

// 發送聊天消息
export async function sendChatMessage(message: string, memberIds: string[]) {
  return apiRequest(api.chat.sendMessage(), {
    method: 'POST',
    body: JSON.stringify({
      message,
      memberIds,
    }),
  });
}
